import React from 'react'
import { motion } from 'framer-motion'
import { Wrench } from 'lucide-react'

const StudentCourses = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br text-richblack-5 from-gray-100 to-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-blue-100 p-4 rounded-full shadow-xl mb-6"
        >
          <Wrench size={40} className="text-blue-600" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-gray-600 max-w-md text-base sm:text-lg">
          We're working hard to make this page awesome for you. Stay tuned, something cool is coming soon!
        </p>
      </motion.div>

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

export default StudentCourses

