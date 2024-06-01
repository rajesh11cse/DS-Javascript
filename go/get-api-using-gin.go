package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Recovery middleware recovers from any panics and writes a 500 if there was one.
	router.Use(gin.Recovery())

	// Root endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome home!"}) //  gin.H => 
	})

	// Root endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome home!"})
	})

	router.GET("/safe", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "This endpoint is safe and sound"})
	})

	router.Run(":8080")
}


/* 
  1. Run : go run main.go
  2. Run the Gin server on port 8080 using router.Run(":8080"). --> localhost:8080


  Add the gin.Recovery() middleware using router.Use(gin.Recovery()). 
  This middleware will catch any panics that occur during the handling of a request and prevent the server from crashing.
  Instead, it will respond with a 500 Internal Server Error.


  gin.H is a shortcut provided by the Gin framework in Go for creating a map with string keys and interface{} values. 
  This type is commonly used to create JSON responses in a more readable and concise manner.

*/