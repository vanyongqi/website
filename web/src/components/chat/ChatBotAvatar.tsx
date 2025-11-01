import { motion } from "framer-motion"

// 可爱的卡通机器人头像
export default function ChatBotAvatar() {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* 头部渐变 */}
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fcd34d" />
        </linearGradient>
        {/* 眼睛渐变 */}
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        {/* 腮红渐变 */}
        <radialGradient id="cheekGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fda4af" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* 机器人头部 - 圆形 */}
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        fill="url(#headGradient)"
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 左侧大眼睛 */}
      <motion.g>
        {/* 眼睛外圈高光 */}
        <motion.circle
          cx="17"
          cy="20"
          r="6"
          fill="rgba(255, 255, 255, 0.3)"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* 眼睛主体 */}
        <motion.circle
          cx="17"
          cy="20"
          r="5"
          fill="url(#eyeGradient)"
          animate={{
            scaleY: [1, 0.1, 1]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
        {/* 眼睛高光 */}
        <motion.circle
          cx="18.5"
          cy="18.5"
          r="2"
          fill="#ffffff"
          animate={{
            x: [0, 0.5, -0.5, 0],
            y: [0, -0.5, 0, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.g>

      {/* 右侧大眼睛 */}
      <motion.g>
        {/* 眼睛外圈高光 */}
        <motion.circle
          cx="31"
          cy="20"
          r="6"
          fill="rgba(255, 255, 255, 0.3)"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.3,
            ease: "easeInOut"
          }}
        />
        {/* 眼睛主体 */}
        <motion.circle
          cx="31"
          cy="20"
          r="5"
          fill="url(#eyeGradient)"
          animate={{
            scaleY: [1, 0.1, 1]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
        {/* 眼睛高光 */}
        <motion.circle
          cx="32.5"
          cy="18.5"
          r="2"
          fill="#ffffff"
          animate={{
            x: [0, 0.5, -0.5, 0],
            y: [0, -0.5, 0, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 0.2,
            ease: "easeInOut"
          }}
        />
      </motion.g>

      {/* 微笑嘴巴 */}
      <motion.path
        d="M 16 28 Q 24 32 32 28"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={{
          d: [
            "M 16 28 Q 24 32 32 28",
            "M 16 30 Q 24 33 32 30",
            "M 16 28 Q 24 32 32 28"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 左侧脸颊红晕 */}
      <motion.ellipse
        cx="10"
        cy="26"
        rx="3"
        ry="2.5"
        fill="url(#cheekGradient)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 右侧脸颊红晕 */}
      <motion.ellipse
        cx="38"
        cy="26"
        rx="3"
        ry="2.5"
        fill="url(#cheekGradient)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
      />

      {/* 天线装饰 */}
      <motion.g>
        <motion.circle
          cx="20"
          cy="8"
          r="2.5"
          fill="#ec4899"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="28"
          cy="8"
          r="2.5"
          fill="#a78bfa"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.7,
            ease: "easeInOut"
          }}
        />
        <line x1="20" y1="12" x2="20" y2="8" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="12" x2="28" y2="8" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  )
}

