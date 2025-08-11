import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from '../services/api'

export const QUERY_KEYS = {
  TASKS: ['tasks'],
}

export const useTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: taskApi.getAllTasks,
    onError: (error) => {
      console.error('Error fetching tasks:', error)
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS })
    },
    onError: (error) => {
      console.error('Error creating task:', error)
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updateData }) => taskApi.updateTask(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS })
    },
    onError: (error) => {
      console.error('Error updating task:', error)
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS })
    },
    onError: (error) => {
      console.error('Error deleting task:', error)
    },
  })
}
