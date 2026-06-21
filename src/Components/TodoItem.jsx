export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        marginBottom: '10px',
        borderRadius: '14px',
        background: todo.isCompleted
          ? 'rgba(52, 211, 153, 0.05)'
          : 'rgba(255, 255, 255, 0.05)',
        border: todo.isCompleted
          ? '1px solid rgba(52, 211, 153, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        {/* Custom Checkbox */}
        <div
          onClick={() => toggleTodo(todo.id)}
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            border: todo.isCompleted ? 'none' : '2px solid rgba(167, 139, 250, 0.5)',
            background: todo.isCompleted
              ? 'linear-gradient(135deg, #34d399, #059669)'
              : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {todo.isCompleted && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <span style={{
          fontSize: '0.95rem',
          color: todo.isCompleted ? '#64748b' : '#e2e8f0',
          textDecoration: todo.isCompleted ? 'line-through' : 'none',
          transition: 'all 0.25s',
          wordBreak: 'break-word',
        }}>
          {todo.text}
        </span>
      </div>

      {/* Sil Butonu */}
      <button
        onClick={() => deleteTodo(todo.id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '8px',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '10px',
          flexShrink: 0,
          transition: 'background 0.2s',
          opacity: 0.6,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.opacity = '0.6';
        }}
        title="Görevi sil"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M9 6V4h6v2"></path>
        </svg>
      </button>
    </li>
  );
}