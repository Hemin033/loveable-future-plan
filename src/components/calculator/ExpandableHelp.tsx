
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableHelpProps {
  title: string;
  items: string[];
  quickTip?: string;
  defaultExpanded?: boolean;
}

const ExpandableHelp = ({ 
  title, 
  items, 
  quickTip,
  defaultExpanded = false 
}: ExpandableHelpProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-caption font-medium text-primary-brand hover:text-primary-hover transition-colors duration-200"
      >
        <span>Learn more</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      
      {isExpanded && (
        <div className="help-card animate-fade-in">
          <div className="help-title">{title}</div>
          <ul className="help-list">
            {items.map((item, index) => (
              <li key={index} className="help-item">
                {item}
              </li>
            ))}
          </ul>
          
          {quickTip && (
            <div className="mt-3 p-3 bg-accent/5 border-l-4 border-accent rounded">
              <p className="text-caption font-medium text-accent">
                💡 Quick Tip: {quickTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableHelp;
