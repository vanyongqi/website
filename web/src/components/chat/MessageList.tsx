import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import ChatBotAvatar from "./ChatBotAvatar"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages, isLoading])

  return (
    <div 
      ref={scrollRef}
      className="h-full overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent"
    >
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 p-0.5">
              <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                <ChatBotAvatar />
              </div>
            </div>
          )}
          
          <div className={`flex flex-col max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`rounded-2xl px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 text-slate-200 border border-purple-500/20'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            </div>
            <span className="text-xs text-slate-500 mt-1">
              {message.timestamp.toLocaleTimeString('zh-CN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-0.5">
              <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                <User className="h-4 w-4 text-purple-300" />
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {/* 加载中提示 */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-3 justify-start"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 p-0.5">
            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
              <ChatBotAvatar />
            </div>
          </div>
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl px-4 py-2">
            <div className="flex gap-1">
              <motion.span
                className="h-2 w-2 rounded-full bg-cyan-400"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="h-2 w-2 rounded-full bg-purple-400"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.span
                className="h-2 w-2 rounded-full bg-pink-400"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

