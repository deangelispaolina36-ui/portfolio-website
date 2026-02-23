import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FlowingBackgroundProps {
  showMouseGlow?: boolean;
  showParticles?: boolean;
  showWaves?: boolean;
  showLines?: boolean;
  showGrid?: boolean;
}

// 粒子类
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#a78bfa'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export function FlowingBackground({
  showMouseGlow = true,
  showParticles = true,
  showWaves = true,
  showLines = true,
  showGrid = true,
}: FlowingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  // 初始化粒子
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !showParticles) return;

    const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle(canvas));
  }, [showParticles]);

  // 动画循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制网格
      if (showGrid) {
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 60;
        
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // 绘制粒子
      if (showParticles) {
        particlesRef.current.forEach((particle) => {
          particle.update(canvas);
          particle.draw(ctx);
        });

        // 绘制粒子连接线（优化：限制检测范围，提升性能）
        if (showLines) {
          const maxConnections = 3; // 每个粒子最多连接数
          particlesRef.current.forEach((particle, i) => {
            let connections = 0;
            for (let j = i + 1; j < particlesRef.current.length && connections < maxConnections; j++) {
              const other = particlesRef.current[j];
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distanceSquared = dx * dx + dy * dy;

              // 使用平方距离避免 Math.sqrt 开销
              if (distanceSquared < 14400) { // 120 * 120
                const distance = Math.sqrt(distanceSquared);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
                connections++;
              }
            }
          });
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showParticles, showLines, showGrid]);

  // 鼠标跟踪
  useEffect(() => {
    if (!showMouseGlow) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showMouseGlow]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 基础渐变背景 */}
      <div className="absolute inset-0 flowing-gradient-bg" />

      {/* Canvas 粒子层 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* 波浪效果 */}
      {showWaves && (
        <>
          <motion.div
            className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* 鼠标跟随光晕 */}
      {showMouseGlow && (
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* 顶部渐变遮罩 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
      
      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export default FlowingBackground;
