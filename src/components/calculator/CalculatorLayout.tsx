
import React from 'react';
import { Shield } from 'lucide-react';
import HeroHeader from './HeroHeader';
import ProgressNavigation from './ProgressNavigation';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const CalculatorLayout = ({ children, currentStep, totalSteps }: CalculatorLayoutProps) => (
  <div className="calculator-layout">
    <HeroHeader />
    <ProgressNavigation currentStep={currentStep} steps={[
      { title: 'About You', subtitle: 'Basic information' },
      { title: 'Current Savings', subtitle: 'Existing investments' },
      { title: 'Income & Goals', subtitle: 'Retirement planning' },
      { title: 'Results', subtitle: 'Your retirement plan' }
    ]} />
    
    <div className="calculator-container">
      <div className="calculator-content">
        {children}
      </div>
    </div>
    
    <footer className="calculator-footer">
      <div className="footer-content">
        <div className="security-badge">
          <Shield className="security-icon" />
          <span>Your information is secure and private</span>
        </div>
        <p className="disclaimer">
          This calculator provides estimates for educational purposes. For personalized advice, consider consulting with a qualified financial advisor. Calculations are based on current Canadian tax laws and benefit structures.
        </p>
      </div>
    </footer>
  </div>
);

export default CalculatorLayout;
