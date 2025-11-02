import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Minimize2, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MessageList from "./MessageList"
import ChatBotAvatar from "./ChatBotAvatar"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatWindowProps {
  isMinimized: boolean
  onClose: () => void
  onMinimize: () => void
  onNewMessage: (hasNew: boolean) => void
}

export default function ChatWindow({ 
  isMinimized, 
  onClose, 
  onMinimize,
  onNewMessage 
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是猿代码的智能客服，有什么可以帮助你的吗？😊',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // TODO: 调用后端 API
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     message: userMessage.content,
    //     history: messages
    //   })
    // })

    // 模拟 AI 回复（等后端准备好后替换）
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '这是一个模拟回复。后端 API 准备好后，这里会显示真实的 RAG 智能回复。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
      onNewMessage(true)
    }, 1000)
  }

  // 处理回车发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 聚焦输入框
  useEffect(() => {
    if (!isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isMinimized])

  if (isMinimized) return null

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/20 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center">
              <ChatBotAvatar />
            </div>
          <div>
            <h3 className="text-sm font-bold text-white">智能客服</h3>
            <p className="text-xs text-slate-400">在线</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white"
            onClick={onMinimize}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* 输入区域 */}
      <div className="border-t border-purple-500/20 bg-slate-800/50 p-3">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            className="flex-1 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:border-purple-500/50"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          按 Enter 发送，Shift+Enter 换行
        </p>
      </div>
    </motion.div>
  )
}

