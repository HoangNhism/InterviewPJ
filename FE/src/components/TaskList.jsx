import { Card, Spin, Alert, Empty, Typography, Statistic, Row, Col } from 'antd'
import { UnorderedListOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useTasks } from '../hooks/useTasks'
import TaskItem from './TaskItem'

const { Title, Text } = Typography

const TaskList = () => {
  const { data: tasks, isLoading, error, isError } = useTasks()

  if (isLoading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>
            <Text>Đang tải danh sách công việc...</Text>
          </div>
        </div>
      </Card>
    )
  }

  if (isError) {
    return (
      <Alert
        message="Lỗi khi tải danh sách công việc"
        description={`${error?.message || 'Lỗi không xác định'}. Vui lòng kiểm tra kết nối mạng và thử lại.`}
        type="error"
        showIcon
        style={{ marginBottom: 24 }}
      />
    )
  }

  const completedTasks = tasks?.filter(task => task.completed) || []
  const pendingTasks = tasks?.filter(task => !task.completed) || []
  const totalTasks = tasks?.length || 0

  if (totalTasks === 0) {
    return (
      <Card
        title={
          <span>
            <UnorderedListOutlined style={{ marginRight: 8 }} />
            Danh sách công việc
          </span>
        }
      >
        <Empty
          description="Chưa có công việc nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Text type="secondary">Hãy thêm công việc đầu tiên của bạn!</Text>
        </Empty>
      </Card>
    )
  }

  return (
    <Card
      title={
        <span>
          <UnorderedListOutlined style={{ marginRight: 8 }} />
          Danh sách công việc
        </span>
      }
    >
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Statistic
            title="Tổng số"
            value={totalTasks}
            prefix={<UnorderedListOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Chưa xong"
            value={pendingTasks.length}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Hoàn thành"
            value={completedTasks.length}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
      </Row>

      <div>
        {pendingTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
        
        {completedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </Card>
  )
}

export default TaskList
