import { useState, type FormEvent } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('login submit', { username, password })
    alert(`提交：${username}/${'*'.repeat(password.length)}`)
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 320, display: 'grid', gap: 12 }}>
      <label>
        用户名
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
        />
      </label>
      <label>
        密码
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
        />
      </label>
      <button type="submit" style={{ padding: '8px 12px' }}>登录</button>
    </form>
  )
}
