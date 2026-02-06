'use client'

import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const SUCCESS_IMAGE = "https://images.unsplash.com/photo-1614031465586-8e401070a847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGxvdmUlMjBjZWxlYnJhdGlvbiUyMGN1dGUlMjB2YWxlbnRpbmV8ZW58MXx8fHwxNzcwMzYwNDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export const SuccessView = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-white/60 shadow-2xl rounded-3xl p-8 flex flex-col items-center text-center max-w-md mx-auto">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-lg relative"
      >
        <ImageWithFallback 
          src={SUCCESS_IMAGE} 
          alt="Celebration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <motion.span 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl"
          >
            🎉
          </motion.span>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 leading-tight"
      >
        Yayyy!! 💕<br />I knew it! 🥰
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-gray-600 font-medium"
      >
        Happy Valentine’s Day ❤️
      </motion.p>
    </div>
  );
};
