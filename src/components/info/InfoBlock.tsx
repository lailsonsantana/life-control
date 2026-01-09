type InfoBlockProps = {
  title: string;
  items: string[];
};

export function InfoBlock({ title, items }: InfoBlockProps) {
  return (
    <div className="w-full bg-[#F0F1F2] rounded-lg shadow p-4">
      <h2 className="font-semibold mb-2">{title}</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum item cadastrado</p>
      ) : (
        <ul className="list-disc ml-5 space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
