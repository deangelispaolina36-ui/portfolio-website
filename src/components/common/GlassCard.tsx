import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl ${hover ? 'card-hover' : ''} ${className}`}
      whileHover={hover ? { y: -5 } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
