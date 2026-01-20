export function Badge({ children, variant }) {
    const color = variant === 'secondary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';
    return <span className={`px-2 py-1 rounded ${color}`}>{children}</span>;
  }
  