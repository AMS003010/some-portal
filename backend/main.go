package main

import (
	"context"
	"log"

	"github.com/achyuthcodes30/backend/controllers"
	db "github.com/achyuthcodes30/backend/sheets"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitSheet()
	defer db.Store.Close(context.Background())
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/publications", controllers.GetAllPublications)
	r.POST("/publication", controllers.AddPublication)
	r.GET("/publication/:id", controllers.GetPublication)
	r.PUT("/publication/:id", controllers.EditPublication)
	r.DELETE("/publication/:id", controllers.DeletePublication)

	uri := "0.0.0.0:5000"

	if err := r.Run(uri); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

}
