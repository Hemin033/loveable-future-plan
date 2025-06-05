
import { useState } from "react";
import { Info } from "lucide-react";

interface SmartTooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
  className?: string;
}

const SmartTooltip = ({ 
  content, 
  position = 'top', 
  maxWidth = 320,
  className = "" 
}: SmartTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900/95';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900/95';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900/95';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900/95';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900/95';
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className={`tooltip-icon ${className}`}
        aria-label="More information"
      >
        <Info className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div
          className={`tooltip-content ${getPositionClasses()}`}
          style={{ maxWidth: `${maxWidth}px` }}
          role="tooltip"
        >
          {content}
          <div className={`tooltip-arrow ${getArrowClasses()}`} />
        </div>
      )}
    </div>
  );
};

export default SmartTooltip;
