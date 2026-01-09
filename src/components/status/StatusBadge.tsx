type StatusArea = "OTIMO" | "BOM" | "RAZOAVEL" | "RUIM" | "PESSIMO";

const statusColor: Record<StatusArea, string> = {
  OTIMO: "bg-green-500",
  BOM: "bg-blue-500",
  RAZOAVEL: "bg-yellow-500",
  RUIM: "bg-orange-500",
  PESSIMO: "bg-red-500"
};

export default function StatusBadge({ status }: { status: StatusArea }) {
  return (
    <span
      className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${statusColor[status]}`}
    >
      {status}
    </span>
  );
}
