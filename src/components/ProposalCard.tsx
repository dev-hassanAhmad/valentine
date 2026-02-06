import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// We'll use the Unsplash image found earlier
const HERO_IMAGE = "https://images.unsplash.com/photo-1548544099-a89e27f73a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwaGVhcnQlMjBpbGx1c3RyYXRpb24lMjBtaW5pbWFsJTIwcGlua3xlbnwxfHx8fDE3NzAzNjAzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface ProposalCardProps {
  onAccept: () => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  
  // Calculate random position within the container safely
  const moveButton = () => {
    if (!containerRef.current || !buttonRef.current || !buttonsContainerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonsContainerRect = buttonsContainerRef.current.getBoundingClientRect();
    
    const btnWidth = buttonRect.width;
    const btnHeight = buttonRect.height;
    
    // Calculate available space with padding
    const padding = 20;
    const maxX = containerRect.width - btnWidth - padding; 
    const maxY = containerRect.height - btnHeight - padding;
    
    // Ensure we have valid dimensions
    if (maxX <= 0 || maxY <= 0) return;
    
    // Calculate position relative to containerRef (accounting for padding)
    const newX = Math.random() * maxX + padding / 2;
    const newY = Math.random() * maxY + padding / 2;
    
    setNoBtnPosition({ x: newX, y: newY });
    setHasMoved(true);
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/90 min-h-[500px] justify-center"
    >
      {/* Decorative Sparkles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-6 right-6 text-pink-400 opacity-60"
      >
        <Sparkles size={24} />
      </motion.div>

      {/* Hero Image */}
      <div className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-pink-100 shadow-inner group">
        <ImageWithFallback 
          src={HERO_IMAGE} 
          alt="Cute Valentine" 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent pointer-events-none" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 leading-tight">
        Will you be my <span className="text-pink-500 inline-block transform hover:scale-110 transition-transform cursor-default">Valentine?</span> 💖
      </h1>
      
      <p className="text-gray-500 mb-10 text-lg">
        It would make me the happiest person!
      </p>

      {/* Buttons Container */}
      <div ref={buttonsContainerRef} className="flex items-center justify-center gap-6 w-full relative z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAccept}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-pink-500/30 transition-all flex items-center gap-2 z-20"
        >
          Yes <span className="text-xl">🥰</span>
        </motion.button>

        {/* The No Button - in buttons container when not moved */}
         { (
           <div className="relative w-32 h-12 flex items-center justify-center">
             <motion.button
               ref={buttonRef}
               onMouseEnter={moveButton}
               onTouchStart={() => moveButton()}
               onClick={moveButton}
               className=" px-6 py-3 bg-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-300 transition-colors flex items-center gap-2 whitespace-nowrap z-10"
               style={{
                display: hasMoved ? "none" : "block",
               }}
             >
               No <span className="text-xl">🙄</span>
             </motion.button>
           </div>
         )}
      </div>

      {/* The No Button - positioned absolutely relative to containerRef when moved */}
      {hasMoved && (
        <motion.button
          ref={buttonRef}
          style={{
            position: 'absolute',
          }}
          animate={{
            top: noBtnPosition.y,
            left: noBtnPosition.x,
            rotate: Math.random() * 20 - 10
          }}
          onMouseEnter={moveButton}
          onTouchStart={() => moveButton()}
          onClick={moveButton}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            mass: 0.8
          }}
          className="cursor-pointer z-20 px-6 py-3 bg-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-300 transition-colors flex items-center gap-2 whitespace-nowrap z-10 shadow-md"
        >
          No <span className="text-xl">🙄</span>
        </motion.button>
      )}
      
      {/* Funny text that appears if you try to chase the button */}
      {hasMoved && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 text-xs text-gray-400 italic"
        >
          (You can't catch me! 😜)
        </motion.p>
      )}
    </div>
  );
};
