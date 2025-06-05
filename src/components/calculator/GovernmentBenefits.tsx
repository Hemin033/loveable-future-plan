
import React, { useState } from 'react';
import { Settings, Info, AlertTriangle } from 'lucide-react';

interface Benefits {
  cpp: number;
  oas: number;
}

interface GovernmentBenefitsProps {
  benefits: Benefits;
  onBenefitChange: (key: string, value: number) => void;
  allowCustom?: boolean;
}

const GovernmentBenefits = ({ benefits, onBenefitChange, allowCustom = true }: GovernmentBenefitsProps) => {
  const [customMode, setCustomMode] = useState(false);

  return (
    <div className="government-benefits-section">
      <div className="section-header">
        <h2 className="section-title">Government Benefits</h2>
        <p className="section-description">
          We've estimated your government benefits based on current rates. These amounts are automatically calculated.
        </p>
        {allowCustom && (
          <button
            type="button"
            className="custom-toggle-btn"
            onClick={() => setCustomMode(!customMode)}
          >
            <Settings className="toggle-icon" />
            {customMode ? 'Use Automatic Calculation' : 'Customize Benefits'}
          </button>
        )}
      </div>

      <div className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-header">
            <div className="benefit-info">
              <h3 className="benefit-title">Canada Pension Plan (CPP)</h3>
              <p className="benefit-subtitle">Maximum annual benefit</p>
            </div>
            <div className="benefit-amount">
              {customMode ? (
                <div className="custom-input-container">
                  <input
                    type="number"
                    value={benefits.cpp}
                    onChange={(e) => onBenefitChange('cpp', parseInt(e.target.value) || 0)}
                    className="benefit-input"
                    placeholder="12000"
                  />
                  <span className="currency-symbol">$</span>
                </div>
              ) : (
                <span className="benefit-value">${benefits.cpp.toLocaleString()}</span>
              )}
            </div>
          </div>
          {!customMode && (
            <div className="benefit-note">
              <Info className="note-icon" />
              <span>Based on maximum contribution for 35+ years</span>
            </div>
          )}
        </div>

        <div className="benefit-card">
          <div className="benefit-header">
            <div className="benefit-info">
              <h3 className="benefit-title">Old Age Security (OAS)</h3>
              <p className="benefit-subtitle">Maximum annual benefit</p>
            </div>
            <div className="benefit-amount">
              {customMode ? (
                <div className="custom-input-container">
                  <input
                    type="number"
                    value={benefits.oas}
                    onChange={(e) => onBenefitChange('oas', parseInt(e.target.value) || 0)}
                    className="benefit-input"
                    placeholder="8700"
                  />
                  <span className="currency-symbol">$</span>
                </div>
              ) : (
                <span className="benefit-value">${benefits.oas.toLocaleString()}</span>
              )}
            </div>
          </div>
          {!customMode && (
            <div className="benefit-note">
              <Info className="note-icon" />
              <span>Available to Canadian residents 65+</span>
            </div>
          )}
        </div>
      </div>

      <div className="benefits-summary">
        <div className="summary-item">
          <span className="summary-label">Total Annual Government Benefits:</span>
          <span className="summary-value">${(benefits.cpp + benefits.oas).toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Monthly Government Income:</span>
          <span className="summary-value">${Math.round((benefits.cpp + benefits.oas) / 12).toLocaleString()}</span>
        </div>
      </div>

      {customMode && (
        <div className="custom-warning">
          <AlertTriangle className="warning-icon" />
          <div>
            <h4>Custom Values Notice</h4>
            <p>You're using custom benefit amounts. Make sure these reflect your actual expected benefits for accurate retirement planning.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentBenefits;
