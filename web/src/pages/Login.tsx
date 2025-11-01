// 导入 React 的 hooks（钩子函数）
import { useState, type ChangeEvent } from 'react'
// 导入 shadcn 组件与工具
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { User, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// 表单校验 schema
const LoginSchema = z.object({
  username: z.string().min(3, '用户名至少3个字符'),
  password: z.string().min(6, '密码至少6个字符'),
})

/**
 * 登录页面组件
 * 这是一个 React 函数组件，用于用户登录
 */
export default function Login() {
  // 使用 useState hook 来管理组件的状态（数据）
  // username 是用户名，setUsername 是更新用户名的函数
  const [username, setUsername] = useState('')
  // password 是密码，setPassword 是更新密码的函数
  const [password, setPassword] = useState('')
  // loading 表示是否正在提交表单
  const [loading, setLoading] = useState(false)

  // 使用 react-hook-form 管理表单
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
  })

  /**
   * 处理表单提交的函数
   * 当用户点击登录按钮时会调用这个函数
   */
  const onSubmit = async () => {
    // 检查用户名和密码是否为空
    if (!username || !password) {
      toast('请输入用户名和密码')
      return
    }

    // 设置加载状态为 true，显示加载动画
    setLoading(true)
    
    try {
      // 模拟发送登录请求到后端
      // 这里暂时用 setTimeout 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 显示成功消息
      toast.success(`欢迎回来，${username}！`)
      
      // 这里将来会调用真实的登录 API
      console.log('登录信息:', { username, password: '***' })
      
    } catch (error) {
      // 如果登录失败，显示错误消息
      toast.error('登录失败，请检查用户名和密码')
    } finally {
      // 无论成功还是失败，都要关闭加载状态
      setLoading(false)
    }
  }

  // 返回 JSX（类似 HTML 的语法，但可以写 JavaScript）
  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      {/* 登录卡片 */}
      <div className="w-full max-w-[400px] shadow-sm rounded-lg border bg-card">
        {/* 登录标题 */}
        <div className="text-center p-6 pb-0">
          <h2 className="text-2xl font-semibold mb-2">用户登录</h2>
          <p className="text-sm text-muted-foreground">请输入您的用户名和密码</p>
        </div>

        {/* 登录表单 */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* 用户名输入框 */}
          <div className="space-y-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User className="w-4 h-4" />
              </span>
              <Input
                placeholder="请输入用户名"
                className="pl-9 h-10"
                value={username}
                {...register('username')}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
            </div>
            {errors.username && (
              <p className="text-xs text-destructive">{errors.username.message}</p>
            )}
          </div>

          {/* 密码输入框 */}
          <div className="space-y-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="w-4 h-4" />
              </span>
              <Input
                type="password"
                placeholder="请输入密码"
                className="pl-9 h-10"
                value={password}
                {...register('password')}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* 登录按钮 */}
          <Button type="submit" className="w-full h-10" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </Button>
        </form>

        {/* 其他操作 */}
        <div className="text-center pb-6">
          <div className="flex items-center justify-center gap-4 text-sm">
            <button className="text-primary hover:underline" type="button">忘记密码？</button>
            <button className="text-primary hover:underline" type="button">注册账号</button>
          </div>
        </div>
      </div>
    </div>
  )
}
