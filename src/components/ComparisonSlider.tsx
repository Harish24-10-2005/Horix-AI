"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Define the props interface for the component
interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const ComparisonSlider = ({ beforeImage, afterImage }: ComparisonSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderPosition = useMotionValue(50);
  const [isDragging, setIsDragging] = useState(false);
  
  // Transform the slider position into a percentage string for width
  const beforeWidth = useTransform(sliderPosition, value => `${value}%`);

  // Function to handle movement
  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerLeft = containerRect.left;
    
    // Calculate position relative to container
    const relativeX = clientX - containerLeft;
    
    // Convert to percentage and clamp between 0 and 100
    const percentage = Math.min(Math.max((relativeX / containerWidth) * 100, 0), 100);
    
    // Update slider position
    sliderPosition.set(percentage);
  };

  // Setup mouse and touch event handlers
  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    if (!container || !slider) return;
    
    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      handleMove(e.clientX);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    
    const onMouseUp = () => {
      setIsDragging(false);
    };
    
    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };
    
    const onTouchEnd = () => {
      setIsDragging(false);
    };
    
    // Allow clicking anywhere in the container to move the slider
    container.addEventListener('mousedown', onMouseDown);
    
    // For the slider handle
    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('touchstart', onTouchStart, { passive: false });
    
    // Global events to ensure smooth dragging even if cursor moves outside container
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);
    
    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden rounded-lg select-none"
    >
      {/* After image (background) */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
      
      {/* Before image (with dynamically adjusting width) */}
      <motion.div 
        className="absolute inset-0 h-full overflow-hidden" 
        style={{ width: beforeWidth }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="w-full h-full object-cover"
          draggable="false"
        />
        
        {/* Divider line */}
        <div className="absolute top-0 bottom-0 right-0 w-1 bg-white shadow-md"></div>
      </motion.div>
      
      {/* Draggable handle */}
      <motion.div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-1 flex items-center justify-center z-10 cursor-ew-resize"
        style={{ left: beforeWidth }}
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg cursor-ew-resize">
          <div className="w-5 h-5 rounded-full bg-[#8c44ff]"></div>
        </div>
      </motion.div>
    </div>
  );
};