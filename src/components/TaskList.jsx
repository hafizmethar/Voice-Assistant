import { FaTasks } from "react-icons/fa";

export default function TaskList({ tasks, onRemove, onClear }) {
  return (
    <section className="mb-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
        <FaTasks /> Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-400 italic">No tasks yet</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-card/70 rounded-xl px-3 py-2">
              <span className="text-gray-200">{t}</span>
              <button
                onClick={() => onRemove(i)}
                className="text-xs text-gray-300 hover:text-red-400 transition">
                remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <button
          onClick={onClear}
          disabled={tasks.length === 0}
          className="text-xs text-gray-300 hover:text-gray-100 disabled:opacity-40 underline decoration-dotted">
          Clear all
        </button>
      </div>
    </section>
  );
}
