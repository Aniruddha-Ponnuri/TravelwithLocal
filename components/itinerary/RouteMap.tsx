export function RouteMap({ stops }: { stops: string[] }) {
  return (
    <div className="flex h-[180px] w-full flex-col justify-center gap-6 rounded-2xl bg-surface-4 px-6">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-[6%] right-[6%] top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed border-brand-orange/70" />
        {stops.map((stop, i) => (
          <div key={stop} className="relative z-10 flex flex-col items-center gap-2">
            <span
              className={`block h-[18px] w-[18px] rounded-full border-2 border-surface-4 shadow-sm ${
                i === 0 ? "bg-brand-teal" : "bg-brand-blue"
              }`}
            />
            <span className="whitespace-nowrap text-sm font-medium text-ink-600">{stop}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
