interface Props {
  weight: number
}

export default function WeightInfo({ weight }: Props) {
  const pct = Math.round((weight - 1) * 100)

  return (
    <div className="bg-white rounded-xl p-5 border border-border">
      <h3 className="font-semibold text-sm text-foreground mb-2">How Weights Work</h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        Your weight increases when you actively participate in sessions. Members with lower
        satisfaction scores (whose preferred choices weren't selected) get more influence in
        future decisions to ensure fairness over time.
      </p>
      <div className="bg-[#f4f3ee] rounded-lg px-4 py-3 text-xs text-foreground leading-relaxed">
        Your current weight of <span className="font-semibold">{weight}</span> means your
        rankings count {pct}% more than the baseline.
      </div>
    </div>
  )
}
