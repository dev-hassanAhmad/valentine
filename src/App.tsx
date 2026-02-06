import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProposalCard } from './components/ProposalCard';
import { SuccessView } from './components/SuccessView';

export default function App() {
  const [accepted, setAccepted] = useState(false);

  // Effect to trigger confetti when accepted
  useEffect(() => {
    if (accepted) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults, 
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults, 
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [accepted]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-100 via-rose-200 to-red-100 flex flex-col items-center justify-center p-4">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full max-w-md"
          >
            <ProposalCard onAccept={() => setAccepted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="z-10 w-full max-w-md"
          >
            <SuccessView />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-rose-400 text-xs font-medium opacity-70">
          Made with <Heart className="inline w-3 h-3 text-red-500 fill-red-500 mx-0.5" /> by your favorite developer
        </p>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
