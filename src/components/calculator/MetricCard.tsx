
interface MetricCardProps {
  value: string | number;
  label: string;
  trend?: 'positive' | 'negative' | 'neutral';
  format?: 'currency' | 'percentage' | 'number';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const MetricCard = ({
  value,
  label,
  trend = 'neutral',
  format = 'number',
  size = 'medium',
  className = ""
}: MetricCardProps) => {
  const formatValue = (val: string | number) => {
    const numValue = typeof val === 'string' ? parseFloat(val) : val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(numValue);
      case 'percentage':
        return `${numValue.toFixed(1)}%`;
      default:
        return numValue.toLocaleString('en-CA');
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-primary-brand';
    }
  };

  const getCardSize = () => {
    switch (size) {
      case 'small':
        return 'p-4';
      case 'large':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const getValueSize = () => {
    switch (size) {
      case 'small':
        return 'text-xl';
      case 'large':
        return 'text-display';
      default:
        return 'text-h1';
    }
  };

  return (
    <div className={`metric-card ${getCardSize()} ${className}`}>
      <div className={`metric-value ${getValueSize()} ${getTrendColor()}`}>
        {formatValue(value)}
      </div>
      <div className="metric-label">
        {label}
      </div>
    </div>
  );
};

export default MetricCard;
