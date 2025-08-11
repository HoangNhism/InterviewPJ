import { Card, Button, Tag, Modal, message, Typography, Space } from 'antd'
import { CheckOutlined, DeleteOutlined, UndoOutlined, LoadingOutlined } from '@ant-design/icons'
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks'

const { Title, Paragraph } = Typography

const TaskItem = ({ task }) => {
  const updateTaskMutation = useUpdateTask()
  const deleteTaskMutation = useDeleteTask()

  const handleToggleComplete = async () => {
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        updateData: { completed: !task.completed }
      })
      message.success(task.completed ? 'Đã đánh dấu chưa hoàn thành' : 'Đã đánh dấu hoàn thành')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật công việc')
    }
  }

  const handleDelete = () => {
    Modal.confirm({
      title: 'Xóa công việc',
      content: 'Bạn có chắc chắn muốn xóa công việc này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteTaskMutation.mutateAsync(task.id)
          message.success('Đã xóa công việc thành công')
        } catch (error) {
          message.error('Có lỗi xảy ra khi xóa công việc')
        }
      },
    })
  }

  return (
    <Card 
      size="small"
      style={{ 
        marginBottom: 16,
        opacity: task.completed ? 0.8 : 1 
      }}
      actions={[
        <Button
          key="toggle"
          type={task.completed ? "default" : "primary"}
          icon={updateTaskMutation.isPending ? <LoadingOutlined /> : task.completed ? <UndoOutlined /> : <CheckOutlined />}
          onClick={handleToggleComplete}
          loading={updateTaskMutation.isPending}
        >
          {task.completed ? 'Chưa xong' : 'Hoàn thành'}
        </Button>,
        <Button
          key="delete"
          danger
          icon={deleteTaskMutation.isPending ? <LoadingOutlined /> : <DeleteOutlined />}
          onClick={handleDelete}
          loading={deleteTaskMutation.isPending}
        >
          Xóa
        </Button>,
      ]}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title 
            level={4} 
            style={{ 
              margin: 0, 
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#999' : undefined
            }}
          >
            {task.title}
          </Title>
          <Tag color={task.completed ? 'green' : 'orange'}>
            {task.completed ? 'Hoàn thành' : 'Chưa xong'}
          </Tag>
        </div>
        <Paragraph 
          style={{ 
            margin: 0,
            color: task.completed ? '#999' : undefined
          }}
        >
          {task.description}
        </Paragraph>
      </Space>
    </Card>
  )
}

export default TaskItem
