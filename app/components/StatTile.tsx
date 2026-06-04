type StatTileProps = {
  value: string;
  label: string;
};

export function StatTile({ value, label }: StatTileProps) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-5 shadow-sm">
      <p className="brand-heading text-3xl font-bold text-[var(--earth-brown)]">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-[var(--charcoal)]">{label}</p>
    </div>
  );
}
