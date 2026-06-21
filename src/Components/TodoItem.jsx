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
          color: '#2d3448',
          cursor: 'pointer',
          padding: '4px',
          lineHeight: 1,
          transition: 'color 0.15s',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#8899aa')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#2d3448')}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </li>
  );
}