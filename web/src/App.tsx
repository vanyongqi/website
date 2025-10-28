import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
  const ping = async () => {
    try {
      const res = await fetch('/api/v1/ping')
      const data = await res.json()
      alert(`Ping: ${data.message}`)
    } catch (e) {
      alert('Ping 失败')
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
      <header style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
        <strong>MyApp</strong>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">首页</Link>
          <Link to="/login">登录</Link>
        </nav>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={ping}>Ping API</button>
        </div>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}
