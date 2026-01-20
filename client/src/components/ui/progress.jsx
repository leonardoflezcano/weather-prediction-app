export function Progress({ value, className }) {
    return (
      <div className={`w-full bg-gray-200 rounded ${className}`}>
        <div style={{ width: `${value}%` }} className="bg-blue-600 h-full rounded"></div>
      </div>
    );
  }
  