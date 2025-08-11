import { Layout, Typography, Space } from 'antd'
import { CheckSquareOutlined, HeartFilled } from '@ant-design/icons'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

function App() {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center',
        padding: '20px 0',
        height: 'auto'
      }}>
        <Space direction="vertical" size="small">
          <Title level={1} style={{ color: 'white', margin: 0 }}>
            <CheckSquareOutlined style={{ marginRight: 12 }} />
            Task Manager
          </Title>
          <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '16px' }}>
            Quản lý công việc đơn giản và hiệu quả
          </Text>
        </Space>
      </Header>
      
      <Content style={{ 
        padding: '24px', 
        maxWidth: 1200, 
        margin: '0 auto', 
        width: '100%' 
      }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <AddTaskForm />
          <TaskList />
        </Space>
      </Content>
      
      <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
        <Text type="secondary">
          Made by Tran Minh Hoang aka "Hoang Nhism" <HeartFilled style={{ color: '#ff4d4f' }} />
        </Text>
      </Footer>
    </Layout>
  )
}

export default App
