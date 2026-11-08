type Star = {
  top: string
  left: string
  size: number
  opacity: number
}

const STARS: Star[] = [
  { top: "6%", left: "14%", size: 1, opacity: 0.35 },
  { top: "10%", left: "78%", size: 1, opacity: 0.5 },
  { top: "14%", left: "42%", size: 2, opacity: 0.35 },
  { top: "17%", left: "63%", size: 1, opacity: 0.6 },
  { top: "20%", left: "88%", size: 1, opacity: 0.4 },
  { top: "24%", left: "7%", size: 2, opacity: 0.5 },
  { top: "27%", left: "31%", size: 1, opacity: 0.45 },
  { top: "30%", left: "55%", size: 1, opacity: 0.3 },
  { top: "33%", left: "72%", size: 2, opacity: 0.55 },
  { top: "36%", left: "18%", size: 1, opacity: 0.35 },
  { top: "39%", left: "93%", size: 1, opacity: 0.5 },
  { top: "42%", left: "46%", size: 1, opacity: 0.3 },
  { top: "46%", left: "11%", size: 1, opacity: 0.55 },
  { top: "48%", left: "82%", size: 2, opacity: 0.4 },
  { top: "52%", left: "27%", size: 1, opacity: 0.35 },
  { top: "55%", left: "64%", size: 1, opacity: 0.5 },
  { top: "58%", left: "38%", size: 2, opacity: 0.3 },
  { top: "61%", left: "90%", size: 1, opacity: 0.45 },
  { top: "64%", left: "5%", size: 1, opacity: 0.4 },
  { top: "67%", left: "52%", size: 1, opacity: 0.35 },
  { top: "70%", left: "74%", size: 1, opacity: 0.5 },
  { top: "73%", left: "22%", size: 2, opacity: 0.3 },
  { top: "76%", left: "44%", size: 1, opacity: 0.45 },
  { top: "79%", left: "86%", size: 1, opacity: 0.35 },
]

export function StarField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
    >
      {STARS.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
