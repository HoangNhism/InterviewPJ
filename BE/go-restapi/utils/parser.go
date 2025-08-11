package utils

import (
	"errors"
	"strconv"
)

var ErrInvalidTaskID = errors.New("invalid task ID")

func ParseTaskID(idStr string) (int, error) {
	if idStr == "" {
		return 0, ErrInvalidTaskID
	}
	
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return 0, ErrInvalidTaskID
	}
	
	if id <= 0 {
		return 0, ErrInvalidTaskID
	}
	
	return id, nil
}
