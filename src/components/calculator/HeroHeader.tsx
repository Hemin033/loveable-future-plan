
import React from 'react';
import { Clock, Shield, MapPin, TrendingUp } from 'lucide-react';

const HeroHeader = () => (
  <div className="hero-header">
    <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">
          Canadian Retirement Planner
          <span className="hero-accent">Your Future Starts Here</span>
        </h1>
        <p className="hero-description">
          Get a personalized retirement strategy in just 5 minutes. We'll show you exactly how much to save and the best strategies for your situation.
        </p>
        <div className="hero-features">
          <div className="feature-item">
            <Clock className="feature-icon" />
            <span>Takes 3-5 minutes</span>
          </div>
          <div className="feature-item">
            <Shield className="feature-icon" />
            <span>Your data stays private</span>
          </div>
          <div className="feature-item">
            <MapPin className="feature-icon" />
            <span>Canadian-specific advice</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-circle">
          <TrendingUp className="hero-icon" />
        </div>
        <div className="floating-elements">
          <div className="float-item">💰</div>
          <div className="float-item">📈</div>
          <div className="float-item">🎯</div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroHeader;
