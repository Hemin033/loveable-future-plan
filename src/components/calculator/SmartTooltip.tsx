
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";

interface SmartTooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
  className?: string;
}

const SmartTooltip = ({ 
  content, 
  children,
  position = 'auto', 
  maxWidth = 280,
  className = "" 
}: SmartTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ 
    top: 0, 
    left: 0, 
    placement: 'top',
    width: undefined as number | undefined
  });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const calculatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setTooltipPosition({ 
        top: window.innerHeight - 200,
        left: 16,
        placement: 'bottom-sheet',
        width: window.innerWidth - 32 
      });
      return;
    }
    
    // Desktop smart positioning
    let top = rect.top - 60;
    let left = rect.left - 140;
    let placement = 'top';
    
    // Check if tooltip fits above
    if (top < 0) {
      top = rect.bottom + 8;
      placement = 'bottom';
    }
    
    // Check if tooltip fits to the left
    if (left < 16) {
      left = 16;
    }
    
    // Check if tooltip fits to the right
    if (left + maxWidth > window.innerWidth) {
      left = window.innerWidth - maxWidth - 16;
    }
    
    setTooltipPosition({ top, left, placement, width: maxWidth });
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, maxWidth]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={`tooltip-trigger ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        tabIndex={0}
        role="button"
        aria-label="More information"
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
      >
        {children || <Info className="w-4 h-4" />}
      </span>
      
      {isVisible && createPortal(
        <div 
          className={`tooltip-portal ${tooltipPosition.placement}`}
          style={{
            position: 'fixed',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            width: tooltipPosition.width ? `${tooltipPosition.width}px` : undefined,
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          <div 
            id="tooltip-content"
            className="tooltip-content"
            role="tooltip"
          >
            {content}
          </div>
        </div>, 
        document.body
      )}
    </>
  );
};

export default SmartTooltip;
