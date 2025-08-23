import { FaClock } from "react-icons/fa";
import { formatDateTime } from "../utils/time";

export default function AlarmList({ alarms, onCancel }) {
  return (
    <div className="mb-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
        <FaClock /> Alarms
      </h2>
      <ul className="pl-5 list-disc text-gray-300">
        {alarms.length === 0 ? (
          <li className="italic text-gray-500">No alarms yet</li>
        ) : (
          alarms.map((alarm, i) => (
            <li
              key={i}
              className="flex justify-between items-center mb-1 bg-gray-800 px-3 py-2 rounded-lg shadow-md"
            >
              <span>{formatDateTime(alarm)}</span>
              <button
                onClick={() => onCancel(i)}
                className="ml-3 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-xs transition duration-200"
              >
                Cancel
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
