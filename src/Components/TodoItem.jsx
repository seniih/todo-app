export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="flex items-center justify-between bg-white p-4 mb-2 rounded shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.id)}
          className="w-5 h-5 cursor-pointer accent-blue-500"
        />
        <span className={`text-lg ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
      >
        Sil
      </button>
    </li>
  );
}