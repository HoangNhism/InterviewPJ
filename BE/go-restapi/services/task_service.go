package services

import (
	"errors"
	"go-restapi/models"
)

var ErrTaskNotFound = errors.New("task not found")

type TaskService struct {
	tasks  map[int]models.Task
	nextID int
}

func NewTaskService() *TaskService {
	return &TaskService{
		tasks:  make(map[int]models.Task),
		nextID: 1,
	}
}

func (ts *TaskService) CreateTask(title, description string) int {
	task := models.Task{
		ID:          ts.nextID,
		Title:       title,
		Description: description,
		Completed:   false,
	}
	ts.tasks[ts.nextID] = task
	ts.nextID++
	return task.ID
}

func (ts *TaskService) GetAllTasks() []models.Task {
	tasks := make([]models.Task, 0, len(ts.tasks))
	for _, task := range ts.tasks {
		tasks = append(tasks, task)
	}
	return tasks
}

func (ts *TaskService) UpdateTask(id int, completed bool) error {
	if task, exists := ts.tasks[id]; exists {
		task.Completed = completed
		ts.tasks[id] = task
		return nil
	}
	return ErrTaskNotFound
}

func (ts *TaskService) DeleteTask(id int) error {
	if _, exists := ts.tasks[id]; exists {
		delete(ts.tasks, id)
		return nil
	}
	return ErrTaskNotFound
}

func (ts *TaskService) GetTaskByID(id int) (models.Task, error) {
	if task, exists := ts.tasks[id]; exists {
		return task, nil
	}
	return models.Task{}, ErrTaskNotFound
}
