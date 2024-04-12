package main

import (
	"fmt"
	"log"
	"os"

	"github.com/achyuthcodes30/backend/controllers"
	"github.com/achyuthcodes30/backend/db"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	defer db.DB.Close()
	r := gin.Default()

	r.GET("/publications", controllers.GetAllPublications)
	r.POST("/publication", controllers.AddPublication)
	r.GET("/publication/:id", controllers.GetPublication)
	r.PUT("/publication/:id", controllers.EditPublication)
	r.DELETE("/publication/:id", controllers.DeletePublication)

	uri := "127.0.0.1:" + os.Getenv("PORT")

	if err := r.Run(uri); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
	fmt.Printf("Running server at port %s", os.Getenv("PORT"))
}
