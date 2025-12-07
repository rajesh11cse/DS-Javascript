/*

	Implement the core logic of a URL shortener — a service that converts long URLs into short codes and retrieves the original URL when the code is provided.
	This is a production service.

	E.g.

	http://www.example.com ==> SERVICE ===> SHORT_CODE
	SHORT_CODE ==> SERVICE ===> http://www.example.com 

	Q: if url is like then is it considered a single or two different urls , 
	A: Shoud be same, How to handle in this pragram
	www.example.com?a=1&b=2
    www.example.com?b=2&a=1

*/

package main

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"sync"
)

// ======================================================
// CONFIG
// ======================================================
const defaultCodeLength = 6 // you can configure size here

// ======================================================
// STORAGE (Thread-safe in-memory DB)
// ======================================================
type URLStore struct {
	mu    sync.RWMutex
	store map[string]string // shortCode -> originalURL
}

func NewURLStore() *URLStore {
	return &URLStore{
		store: make(map[string]string),
	}
}

func (s *URLStore) Save(code, url string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.store[code] = url
}

func (s *URLStore) Get(code string) (string, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	val, ok := s.store[code]
	return val, ok
}

// ======================================================
// CODE GENERATOR
// ======================================================
func generateRandomCode(n int) string {
	// generate 4/3*n random bytes and base64 encode → remove non-alphanumerics
	b := make([]byte, n)
	_, _ = rand.Read(b)

	encoded := base64.URLEncoding.EncodeToString(b)
	return encoded[:n] // take only first n chars
}

// Keep regenerating if collision happens
func (s *URLStore) GenerateUniqueCode(n int) string {
	for {
		code := generateRandomCode(n)
		if _, exists := s.Get(code); !exists {
			return code
		}
	}
}

// ======================================================
// SERVICE LAYER
// ======================================================
type ShortenerService struct {
	store *URLStore
	size  int
}

func NewShortener(size int) *ShortenerService {
	if size <= 0 {
		size = defaultCodeLength
	}
	return &ShortenerService{
		store: NewURLStore(),
		size:  size,
	}
}

func (s *ShortenerService) Shorten(longURL string) string {
	code := s.store.GenerateUniqueCode(s.size)
	s.store.Save(code, longURL)
	return code
}

func (s *ShortenerService) Resolve(code string) (string, error) {
	url, ok := s.store.Get(code)
	if !ok {
		return "", errors.New("short code not found")
	}
	return url, nil
}

// ======================================================
// MAIN (Example usage)
// ======================================================
func main() {
	service := NewShortener(6) // length of short URL code

	// Shorten URL
	code := service.Shorten("https://www.example.com/products/abc?ref=x123")
	fmt.Println("Short Code:", code)

	// Resolve URL
	original, err := service.Resolve(code)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Original URL:", original)
}
