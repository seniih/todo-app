export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 0',
        borderBottom: '1px solid #1f1f1f',
      }}
    >
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
        style={{
          width: '16px',
          height: '16px',
          flexShrink: 0,
          cursor: 'pointer',
          accentColor: '#e5e5e5',
        }}
      />

      <span
        style={{
          flex: 1,
          fontSize: '0.9rem',
          color: todo.isCompleted ? '#444' : '#ccc',
          textDecoration: todo.isCompleted ? 'line-through' : 'none',
          lineHeight: '1.4',
          wordBreak: 'break-word',
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        style={{
          background: 'none',
          border: 'none',
          color: '#333',
          cursor: 'pointer',
          fontSize: '1rem',
          padding: '2px 4px',
          lineHeight: 1,
          transition: 'color 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#888')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
      >
        ×
      </button>
    </li>
  );
}