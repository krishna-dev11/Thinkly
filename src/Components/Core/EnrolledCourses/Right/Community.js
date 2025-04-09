import React from 'react'
import { motion } from 'framer-motion'
import { Wrench } from 'lucide-react'

const Community = () => {
  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        {/* Icon with glow */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className=" bg-blue-300 p-6 rounded-full shadow-xl border border-gray-200 mb-8"
        >
          <Wrench
            size={48}
            className="text-gray-800 drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]"
          />
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          Under Construction
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed">
          We're currently working on this page to bring you something awesome.
          Please check back later!
        </p>
      </motion.div>

      {/* Fancy animated underline */}
      <motion.div
        className="mt-10 h-3 w-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-lg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ transformOrigin: 'left' }}
      />

    </div>
  )
}

export default Community
