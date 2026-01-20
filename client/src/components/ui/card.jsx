export function Card({ children, className, bgColor = "bg-white" }) {
  return <div className={`p-4 shadow-md rounded-lg ${bgColor} ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}
