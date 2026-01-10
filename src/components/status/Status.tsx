import { StatusArea } from "@/resources/area_controle/status_area";

interface StatusProps {
  text: StatusArea;
}

const statusConfig = {
  PESSIMO: {
    label: 'PÉSSIMO',
    color: 'text-red-600',
    icon: '😡',
  },
  RUIM: {
    label: 'RUIM',
    color: 'text-orange-600',
    icon: '🙁',
  },
  RAZOAVEL: {
    label: 'RAZOÁVEL',
    color: 'text-yellow-600',
    icon: '😐',
  },
  BOM: {
    label: 'BOM',
    color: 'text-green-500',
    icon: '🙂',
  },
  OTIMO: {
    label: 'ÓTIMO',
    color: 'text-green-700',
    icon: '😄',
  },
} as const;

const Status: React.FC<StatusProps> = ({text}) => {
  const status = statusConfig[text];

  if (!status) return null;

  return (
    <div className={`flex items-center gap-1 font-bold ${status.color}`}>
      <span>{status.icon}</span>
      <span>{status.label}</span>
    </div>
  );
};

export default Status;
