import { useAtom } from 'jotai'
import { Form, Input, Button, Card, message } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { newTaskTitleAtom, newTaskDescriptionAtom, resetFormAtom } from '../store/atoms'
import { useCreateTask } from '../hooks/useTasks'

const { TextArea } = Input

const AddTaskForm = () => {
  const [title, setTitle] = useAtom(newTaskTitleAtom)
  const [description, setDescription] = useAtom(newTaskDescriptionAtom)
  const [, resetForm] = useAtom(resetFormAtom)
  const [form] = Form.useForm()
  
  const createTaskMutation = useCreateTask()

  const handleSubmit = async (values) => {
    try {
      await createTaskMutation.mutateAsync({
        title: values.title.trim(),
        description: values.description.trim(),
      })
      
      resetForm()
      form.resetFields()
      message.success('Công việc đã được tạo thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo công việc')
    }
  }

  return (
    <Card 
      title={
        <span>
          <PlusOutlined style={{ marginRight: 8 }} />
          Thêm công việc mới
        </span>
      }
      style={{ marginBottom: 24 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ title, description }}
      >
        <Form.Item
          label="Tiêu đề công việc"
          name="title"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề công việc!' },
            { min: 3, message: 'Tiêu đề phải có ít nhất 3 ký tự!' }
          ]}
        >
          <Input
            placeholder="Nhập tiêu đề công việc..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={createTaskMutation.isPending}
          />
        </Form.Item>
        
        <Form.Item
          label="Mô tả công việc"
          name="description"
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả công việc!' },
            { min: 5, message: 'Mô tả phải có ít nhất 5 ký tự!' }
          ]}
        >
          <TextArea
            placeholder="Nhập mô tả chi tiết về công việc..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={createTaskMutation.isPending}
            rows={4}
          />
        </Form.Item>
        
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createTaskMutation.isPending}
            icon={createTaskMutation.isPending ? <LoadingOutlined /> : <PlusOutlined />}
            size="large"
            block
          >
            {createTaskMutation.isPending ? 'Đang tạo...' : 'Tạo công việc'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default AddTaskForm
