const colorClasses = {
  gray: "bg-gray-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
};

export default function ColorSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const colors = Object.keys(colorClasses);

  return (
    <div className="relative flex items-center justify-center">
      <button
        className={`w-6 h-6 rounded-full border border-gray-300 transition-transform duration-200 hover:scale-110 ${colorClasses[value]}`}
        onClick={() => setOpen(!open)}
      ></button>

      {colors.map((color, i) => {
        const angle = (i / colors.length) * 2 * Math.PI;
        const radius = 40;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <button
            key={color}
            className={`absolute w-5 h-5 rounded-full border border-gray-300 shadow-sm transition-all duration-300 ease-out z-999 ${
              open ? "opacity-100 scale-100" : "opacity-0 scale-0"
            } ${colorClasses[color]}`}
            style={{
              transform: open
                ? `translate(${x}px, ${y}px)`
                : "translate(0, 0)",
            }}
            onClick={() => {
              onChange(color);
              setOpen(false);
            }}
          ></button>
        );
      })}
    </div>
  );
}
