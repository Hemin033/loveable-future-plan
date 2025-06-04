
interface ExplanationCardProps {
  title: string;
  explanation: string;
  thingsToConsider: string;
}

const ExplanationCard = ({ title, explanation, thingsToConsider }: ExplanationCardProps) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
      <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-700 mb-2">{explanation}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-600 mb-1">Things to Consider:</p>
          <p className="text-xs text-gray-600">{thingsToConsider}</p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;
