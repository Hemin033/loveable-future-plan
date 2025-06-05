
import { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip = ({ content, children, className = "" }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={className}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-brand-secondary text-white text-sm rounded-lg max-w-xs whitespace-normal shadow-lg">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-brand-secondary"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
