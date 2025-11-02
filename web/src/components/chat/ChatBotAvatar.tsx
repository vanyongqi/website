import { motion } from "framer-motion"

// 机器人头像 - 使用微笑表情emoji
export default function ChatBotAvatar() {
  return (
    <motion.div
      className="text-4xl flex items-center justify-center w-full h-full"
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }}
    >
      😊
    </motion.div>
  )
}
