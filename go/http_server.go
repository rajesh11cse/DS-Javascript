package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Define a handler for the root route "/"
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the Go HTTP server!")
	})

	// Define a handler for the "/hello" route
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	// Start the HTTP server on port 8080
	fmt.Println("Server is running on port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
