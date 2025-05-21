import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Define colors from the theme
    const themeColors = [
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#FF3CAC',
      getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#784BA0',
      getComputedStyle(document.documentElement).getPropertyValue('--color-highlight').trim() || '#2B86C5'
    ];

    // Create particles
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;
      decreasing: boolean;
    }

    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 3 + 1.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.7,
          y: (Math.random() - 0.5) * 0.7
        },
        alpha: Math.random() * 0.7 + 0.3,
        decreasing: Math.random() > 0.5
      });
    }

    // Get background colors
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() || '#0D0D0D';
    const bgDarkColor = '#0A0A0A'; // Slightly darker variant

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, bgColor);
      gradient.addColorStop(1, bgDarkColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (const particle of particles) {
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Boundary checking
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x = -particle.velocity.x;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y = -particle.velocity.y;
        }

        // Update alpha for pulsing effect
        if (particle.decreasing) {
          particle.alpha -= 0.005;
          if (particle.alpha <= 0.1) {
            particle.decreasing = false;
          }
        } else {
          particle.alpha += 0.005;
          if (particle.alpha >= 0.5) {
            particle.decreasing = true;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw some larger blurred gradient circles
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(Date.now() * 0.001 + i * Math.PI / 2.5) * canvas.width * 0.4 + canvas.width * 0.5;
        const y = Math.cos(Date.now() * 0.0015 + i * Math.PI / 2.5) * canvas.height * 0.4 + canvas.height * 0.5;
        const radius = Math.max(canvas.width, canvas.height) * 0.2;
        
        const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const color = themeColors[i % themeColors.length] || '#FF3CAC';
        circleGradient.addColorStop(0, `${color}40`);
        circleGradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = circleGradient;
        ctx.fill();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default AnimatedBackground; 