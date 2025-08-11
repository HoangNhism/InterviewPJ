package handlers

import (
	"go-restapi/models"
	"go-restapi/services"
	"go-restapi/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	service *services.TaskService
}

func NewTaskHandler(service *services.TaskService) *TaskHandler {
	return &TaskHandler{service: service}
}

func (th *TaskHandler) CreateTask(c *gin.Context) {
	var req models.CreateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request body",
			"details": err.Error(),
		})
		return
	}

	if req.Description == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Description is required",
		})
		return
	}

	id := th.service.CreateTask(req.Title, req.Description)
	c.JSON(http.StatusCreated, gin.H{
		"id": id,
	})
}

func (th *TaskHandler) GetTasks(c *gin.Context) {
	tasks := th.service.GetAllTasks()
	c.JSON(http.StatusOK, tasks)
}

func (th *TaskHandler) UpdateTask(c *gin.Context) {
	id, err := utils.ParseTaskID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid task ID",
		})
		return
	}

	var req models.UpdateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request body",
			"details": err.Error(),
		})
		return
	}

	if err := th.service.UpdateTask(id, req.Completed); err != nil {
		if err == services.ErrTaskNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Task not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update task",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Task updated successfully",
	})
}

func (th *TaskHandler) DeleteTask(c *gin.Context) {
	id, err := utils.ParseTaskID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid task ID",
		})
		return
	}

	if err := th.service.DeleteTask(id); err != nil {
		if err == services.ErrTaskNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Task not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete task",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Task deleted successfully",
	})
}
