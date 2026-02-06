export default function ConfidenceGauge({ score }: { score: number }) {
  const radius = 40;
  const stroke = 8;
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedScore / 100) * circumference;

  return (
    <svg width={100} height={100}>
      <circle
        cx={50}
        cy={50}
        r={radius}
        stroke="#eee"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={50}
        cy={50}
        r={radius}
        stroke="#7c3aed" // your purple
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#000"
      >
        {score}%
      </text>
    </svg>
  );
}
