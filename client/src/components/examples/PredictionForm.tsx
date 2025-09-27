import { PredictionForm } from '../PredictionForm';

export default function PredictionFormExample() {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="p-4">
      <PredictionForm onSubmit={handleSubmit} />
    </div>
  );
}