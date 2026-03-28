export default function EdsonLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 290 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M15 25C15 16.7157 21.7157 10 30 10H40C48.2843 10 55 16.7157 55 25C55 33.2843 48.2843 40 40 40H30C21.7157 40 15 33.2843 15 25Z" stroke="#25AAE1" strokeWidth="4"/>
      <circle cx="35" cy="25" r="5" fill="#25AAE1"/>
      <path d="M22 30C26 35 32 38 48 30" stroke="#25AAE1" strokeWidth="3" strokeLinecap="round"/>
      <text x="70" y="34" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="800" fill="#1A1A1A" letterSpacing="-0.5">Edson</text>
      <text x="150" y="34" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="300" fill="#25AAE1" letterSpacing="0">Lavanderia</text>
    </svg>
  );
}
