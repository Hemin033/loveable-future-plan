
import { motion } from "framer-motion";
import { CalculatorData } from "./types";

interface TimelineChartProps {
  data: CalculatorData;
  isDarkMode?: boolean;
}

export const RetirementTimelineChart = ({ data, isDarkMode = false }: TimelineChartProps) => {
  const yearsToRetirement = data.retirementAge - data.currentAge;
  const currentSavings = data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings;
  const annualContribution = data.monthlyContributions * 12;
  
  // Simple projection calculation
  const returnRate = data.riskTolerance === "conservative" ? 0.045 : 
                    data.riskTolerance === "moderate" ? 0.065 : 0.085;
  
  const projectedSavings = [];
  let savings = currentSavings;
  
  for (let year = 0; year <= yearsToRetirement; year++) {
    projectedSavings.push({
      year: data.currentAge + year,
      amount: savings
    });
    if (year < yearsToRetirement) {
      savings = savings * (1 + returnRate) + annualContribution;
    }
  }
  
  const maxAmount = Math.max(...projectedSavings.map(p => p.amount));
  
  return (
    <div className={`p-6 rounded-3xl ${
      isDarkMode ? 'bg-white/5' : 'bg-white/30'
    } backdrop-blur-sm border border-white/20`}>
      <h3 className={`text-lg font-semibold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        📈 Retirement Savings Timeline
      </h3>
      
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="40"
              y1={160 - (percent * 1.2)}
              x2="380"
              y2={160 - (percent * 1.2)}
              stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((percent, index) => (
            <text
              key={percent}
              x="35"
              y={165 - (percent * 1.2)}
              fill={isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"}
              fontSize="12"
              textAnchor="end"
            >
              ${Math.round((maxAmount * percent / 100) / 1000)}K
            </text>
          ))}
          
          {/* Area chart */}
          <defs>
            <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d={`M 40 160 ${projectedSavings.map((point, index) => {
              const x = 40 + (index * (340 / (projectedSavings.length - 1)));
              const y = 160 - ((point.amount / maxAmount) * 120);
              return `L ${x} ${y}`;
            }).join(' ')} L 380 160 Z`}
            fill="url(#savingsGradient)"
            stroke="rgb(59, 130, 246)"
            strokeWidth="3"
          />
          
          {/* Data points */}
          {projectedSavings.map((point, index) => {
            const x = 40 + (index * (340 / (projectedSavings.length - 1)));
            const y = 160 - ((point.amount / maxAmount) * 120);
            
            return (
              <motion.circle
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                cx={x}
                cy={y}
                r="4"
                fill="rgb(59, 130, 246)"
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Age {data.currentAge}
        </span>
        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Projected: ${Math.round(projectedSavings[projectedSavings.length - 1].amount).toLocaleString()}
        </span>
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Age {data.retirementAge}
        </span>
      </div>
    </div>
  );
};

interface ReadinessGaugeProps {
  percentage: number;
  isDarkMode?: boolean;
}

export const ReadinessGauge = ({ percentage, isDarkMode = false }: ReadinessGaugeProps) => {
  const circumference = 2 * Math.PI * 80;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getColor = (percent: number) => {
    if (percent >= 80) return "text-green-500";
    if (percent >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  return (
    <div className={`p-8 rounded-3xl text-center ${
      isDarkMode ? 'bg-white/5' : 'bg-white/30'
    } backdrop-blur-sm border border-white/20`}>
      <h3 className={`text-lg font-semibold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        🎯 Retirement Readiness
      </h3>
      
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
            strokeWidth="12"
          />
          
          {/* Progress circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            className="drop-shadow-lg"
          />
          
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444"} />
              <stop offset="100%" stopColor={percentage >= 80 ? "#34d399" : percentage >= 60 ? "#fbbf24" : "#f87171"} />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className={`text-4xl font-bold ${getColor(percentage)} ${isDarkMode ? '' : 'drop-shadow-sm'}`}
            >
              {Math.round(percentage)}%
            </motion.div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ready
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-6 text-sm ${
        percentage >= 80 ? 'text-green-600' : 
        percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
      }`}>
        {percentage >= 80 ? "Excellent! You're on track for a comfortable retirement." :
         percentage >= 60 ? "Good progress, but there's room for improvement." :
         "Consider increasing your savings or adjusting your retirement goals."}
      </div>
    </div>
  );
};
