package main

import (
	"log"

	"github.com/achyuthcodes30/backend/controllers"
	"github.com/achyuthcodes30/backend/db"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	defer db.DB.Close()
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/publications", controllers.GetAllPublications)
	r.POST("/publication", controllers.AddPublication)
	//r.GET("/testpublic", controllers.GetAllPublicationsNew)
	r.GET("/publication/:id", controllers.GetPublication)
	r.PUT("/publication/:id", controllers.EditPublication)
	r.DELETE("/publication/:id", controllers.DeletePublication)

	uri := "127.0.0.1:5000"

	if err := r.Run(uri); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

}
