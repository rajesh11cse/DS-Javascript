package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	oddChan := make(chan struct{})
	evenChan := make(chan struct{})
	wg.Add(2)
	// Goroutine 1: prints odd numbers
	go func() {
		defer wg.Done()
		for i := 1; i <= 9; i += 2 {
			<-oddChan
			fmt.Println("odd:", i)
			evenChan <- struct{}{}
		}
		close(evenChan) // Close evenChan to signal the end of sequence
	}()

	// Goroutine 2: prints even numbers
	go func() {
		defer wg.Done()
		for i := 2; i <= 10; i += 2 {
			<-evenChan
			fmt.Println("even:", i)
			if i != 10 {
				oddChan <- struct{}{}
			}
		}
		close(oddChan) // Close oddChan to signal the end of sequence
	}()
	// Start the process by signaling the odd number goroutine
	oddChan <- struct{}{}
	wg.Wait()
}
