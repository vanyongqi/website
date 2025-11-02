import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatWindow from "./ChatWindow"
import ChatBotAvatar from "./ChatBotAvatar"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  const handleToggle = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized)
    } else {
      setIsOpen(true)
      setIsMinimized(false)
      setHasNewMessage(false)
    }
  }

  return (
    <>
      {/* 悬浮小人按钮 */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          y: [0, -8, 0]
        }}
        transition={{
          scale: { type: "spring", stiffness: 260, damping: 20 },
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
      >
        <div className="relative">
          {/* 新消息提示 */}
          {hasNewMessage && (
            <motion.div
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-slate-950 z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5
              }}
            />
          )}
          
          {/* 机器人头像 */}
          <div className="relative h-16 w-16 flex items-center justify-center">
            <ChatBotAvatar />
          </div>
        </div>
      </motion.div>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            isMinimized={isMinimized}
            onClose={() => setIsOpen(false)}
            onMinimize={() => setIsMinimized(true)}
            onNewMessage={(hasNew: boolean) => setHasNewMessage(hasNew)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

