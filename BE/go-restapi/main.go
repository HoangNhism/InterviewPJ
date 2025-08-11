package main

import (
	"go-restapi/handlers"
	"go-restapi/middleware"
	"go-restapi/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize service and handler
	taskService := services.NewTaskService()
	taskHandler := handlers.NewTaskHandler(taskService)

	// Setup Gin router
	r := gin.Default()

	// Add middleware
	r.Use(middleware.ErrorHandler())
	r.Use(middleware.CORS())
	r.Use(gin.Recovery())

	// Define API routes
	api := r.Group("/api")
	{
		api.POST("/tasks", taskHandler.CreateTask)
		api.GET("/tasks", taskHandler.GetTasks)
		api.PUT("/tasks/:id", taskHandler.UpdateTask)
		api.DELETE("/tasks/:id", taskHandler.DeleteTask)
	}

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "task-management-api",
			"version": "1.0.0",
		})
	})

	// Root endpoint
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Task Management API",
			"version": "1.0.0",
			"endpoints": gin.H{
				"health":      "GET /health",
				"tasks":       "GET /api/tasks",
				"create_task": "POST /api/tasks",
				"update_task": "PUT /api/tasks/:id",
				"delete_task": "DELETE /api/tasks/:id",
			},
		})
	})

	// Start server
	port := ":8080"
	log.Printf("Starting Task Management API server on port %s", port)
	log.Printf("Available endpoints:")
	log.Printf("  GET    / - API information")
	log.Printf("  GET    /health - Health check")
	log.Printf("  POST   /api/tasks - Create new task")
	log.Printf("  GET    /api/tasks - Get all tasks")
	log.Printf("  PUT    /api/tasks/:id - Update task")
	log.Printf("  DELETE /api/tasks/:id - Delete task")
	
	if err := r.Run(port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
