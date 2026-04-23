import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'md' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 lg:p-0"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "w-full bg-white dark:bg-[#0B1120] rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/5 overflow-hidden relative",
                maxWidthClasses[maxWidth]
              )}
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black tracking-tighter dark:text-white italic uppercase">{title}</h2>
                  <button 
                    onClick={onClose}
                    className="p-3 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-rose-500/10 hover:text-rose-500 dark:hover:bg-rose-500/20 dark:hover:text-rose-400 rounded-2xl transition-all shadow-sm"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>
                <div className="relative z-10">
                   {children}
                </div>
                
                {/* Decorative Bloom */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none -z-10 rounded-full opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
