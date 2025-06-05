
interface ExplanationCardProps {
  title: string;
  explanation: string;
  thingsToConsider: string;
}

const ExplanationCard = ({ title, explanation, thingsToConsider }: ExplanationCardProps) => {
  return (
    <div className="card-surface space-y-3">
      <h4 className="text-h3 text-brand-secondary">{title}</h4>
      <div className="space-y-3">
        <div>
          <p className="text-body text-text-primary">{explanation}</p>
        </div>
        <div>
          <p className="text-caption font-medium text-text-secondary mb-1">Things to Consider:</p>
          <p className="text-caption text-text-secondary">{thingsToConsider}</p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;
