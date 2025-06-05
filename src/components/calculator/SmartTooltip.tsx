
import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface SmartTooltipProps {
  content: string;
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
  className?: string;
}

const SmartTooltip = ({ 
  content, 
  position = 'auto', 
  maxWidth = 280,
  className = "" 
}: SmartTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState('top');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && position === 'auto' && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Smart positioning logic
      let newPosition = 'top';
      
      // Check if tooltip fits above
      if (triggerRect.top - tooltipRect.height - 8 < 0) {
        newPosition = 'bottom';
      }
      
      // Check if tooltip fits to the right
      if (triggerRect.right + tooltipRect.width + 8 > viewportWidth) {
        newPosition = 'left';
      }
      
      // Check if tooltip fits to the left
      if (triggerRect.left - tooltipRect.width - 8 < 0) {
        newPosition = 'right';
      }

      setActualPosition(newPosition);
    }
  }, [isVisible, position]);

  const getTooltipClasses = () => {
    const baseClasses = `
      tooltip-content 
      ${actualPosition === 'auto' ? 'tooltip-top' : `tooltip-${actualPosition}`}
      ${isVisible ? 'tooltip-enter' : ''}
    `;
    return baseClasses;
  };

  return (
    <div className="tooltip-container">
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className={`tooltip-trigger ${className}`}
        aria-label="More information"
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
      >
        <Info className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip-content"
          className={getTooltipClasses()}
          style={{ 
            maxWidth: `${maxWidth}px`,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none'
          }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default SmartTooltip;
