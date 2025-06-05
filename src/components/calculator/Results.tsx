import React from "react";
import { DollarSign, Target, Calendar, TrendingUp, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { RetirementData } from "./types";
import MetricCard from "./MetricCard";

interface ResultsProps {
  data: RetirementData;
}

const Results = ({ data }: ResultsProps) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalCurrentSavings =
    data.rrspBalance + data.tfsaBalance + data.nonRegisteredSavings + data.otherSavings;

  const targetRetirementIncome =
    data.desiredIncome *
    (data.selectedLifestyle === "essential"
      ? 0.6
      : data.selectedLifestyle === "comfortable"
      ? 0.7
      : data.selectedLifestyle === "enhanced"
      ? 0.8
      : data.customPercentage / 100);

  const monthlyRetirementIncome =
    (data.cppBenefits + data.oasBenefits + data.companyPension) / 12;

  const requiredSavings =
    ((targetRetirementIncome - data.cppBenefits - data.oasBenefits - data.companyPension) * 25);

  const projectedSavings =
    totalCurrentSavings *
    Math.pow(1 + data.expectedReturn, data.retirementAge - data.currentAge) +
    ((Math.pow(1 + data.expectedReturn, data.retirementAge - data.currentAge) - 1) /
      data.expectedReturn) *
    data.monthlyContributions *
    12;

  const generateProjectionData = () => {
    const projectionData = [];
    let currentSavings = totalCurrentSavings;
    
    for (let age = data.currentAge; age <= data.retirementAge + 10; age++) {
      if (age <= data.retirementAge) {
        currentSavings = currentSavings * (1 + data.expectedReturn) + (data.monthlyContributions * 12);
      } else {
        currentSavings = Math.max(0, currentSavings - (data.desiredIncome * 0.7));
      }
      
      projectionData.push({
        age,
        portfolioValue: Math.max(0, currentSavings),
        goalLine: requiredSavings
      });
    }
    
    return projectionData;
  };

  const getReadinessScore = () => {
    const ratio = projectedSavings / requiredSavings;
    return Math.min(100, Math.round(ratio * 100));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--error)';
  };

  const readinessScore = getReadinessScore();
  const monthlyGap = (requiredSavings - projectedSavings) / ((data.retirementAge - data.currentAge) * 12);
  const projectionData = generateProjectionData();

  const immediateActions = [
    "Increase monthly contributions by " + formatCurrency(Math.abs(monthlyGap)),
    "Review and optimize investment portfolio",
    "Maximize TFSA and RRSP contributions",
    "Consider increasing income through side work"
  ];

  const ongoingActions = [
    "Review retirement plan annually",
    "Rebalance portfolio quarterly",
    "Monitor government benefit changes",
    "Consider working with a financial advisor"
  ];

  return (
    <div className="results-dashboard">
      {/* Hero Results Section */}
      <div className="results-hero">
        <div className="score-section">
          <div className="score-circle">
            <div className="w-32 h-32 rounded-full border-8 border-white/20 flex items-center justify-center relative">
              <div 
                className="absolute inset-0 rounded-full border-8 border-t-white"
                style={{
                  transform: `rotate(${(readinessScore / 100) * 360 - 90}deg)`,
                  borderColor: `transparent transparent transparent white`
                }}
              ></div>
              <div className="score-content">
                <span className="score-number">{readinessScore}%</span>
                <span className="score-label">Ready</span>
              </div>
            </div>
          </div>
          
          <div className="score-text">
            <h1>
              {readinessScore >= 80 ? "You're on track! 🎉" :
               readinessScore >= 60 ? "You're making progress 📈" :
               readinessScore >= 40 ? "Time to boost your savings 💪" :
               "Let's create your plan 🚀"}
            </h1>
            <p>
              {readinessScore >= 80 ? "Great job! Keep up the excellent work with your retirement planning." :
               readinessScore >= 60 ? "You're on the right path. A few adjustments will get you to your goal." :
               "With focused effort and the right strategy, you can significantly improve your retirement readiness."}
            </p>
          </div>
        </div>
        
        <div className="key-metric">
          <span className="metric-label">Monthly Gap</span>
          <span className={`metric-value ${monthlyGap > 0 ? 'negative' : 'positive'}`}>
            {formatCurrency(Math.abs(monthlyGap))}
          </span>
          <div className="text-sm opacity-80 mt-1">
            {monthlyGap > 0 ? "Additional needed" : "You're ahead!"}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <DollarSign className="stat-icon" />
          <div>
            <div className="stat-value">{formatCurrency(monthlyRetirementIncome)}</div>
            <div className="stat-label">Monthly Retirement Income</div>
          </div>
        </div>
        
        <div className="stat-card">
          <Target className="stat-icon" />
          <div>
            <div className="stat-value">{formatCurrency(requiredSavings)}</div>
            <div className="stat-label">Total Savings Needed</div>
          </div>
        </div>
        
        <div className="stat-card">
          <Calendar className="stat-icon" />
          <div>
            <div className="stat-value">{formatCurrency(data.monthlyContributions + Math.max(0, monthlyGap))}</div>
            <div className="stat-label">Recommended Monthly</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h2>Your Retirement Projection</h2>
        <div className="mb-4">
          <p className="text-text-secondary">
            This chart shows how your savings will grow over time and what happens in retirement.
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={projectionData}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--brand-accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--brand-accent)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area 
              dataKey="portfolioValue" 
              stroke="var(--brand-accent)" 
              strokeWidth={3}
              fill="url(#portfolioGradient)"
            />
            <XAxis 
              dataKey="age" 
              stroke="var(--gray-400)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--gray-400)"
              fontSize={12}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-lg)'
              }}
              formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
              labelFormatter={(age) => `Age ${age}`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Action Plan */}
      <div className="action-section">
        <h2>Your Personalized Action Plan</h2>
        
        <div className="action-grid">
          <div className="action-category">
            <h3>
              <Zap className="w-5 h-5" />
              Start This Month
            </h3>
            <ul>
              {immediateActions.map((action, index) => (
                <li key={index}>
                  <CheckCircle className="w-4 h-4 text-success" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="action-category">
            <h3>
              <TrendingUp className="w-5 h-5" />
              Ongoing Strategy
            </h3>
            <ul>
              {ongoingActions.map((action, index) => (
                <li key={index}>
                  <ArrowRight className="w-4 h-4 text-brand-primary" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to take action on your retirement plan?</h2>
        <p className="text-text-secondary mb-6">
          Get personalized investment recommendations and start building your future today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">
            Get Investment Plan
          </button>
          <button className="btn-secondary">
            Download Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
