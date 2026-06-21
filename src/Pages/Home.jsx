import { useState, useEffect } from 'react';
import TodoItem from '../Components/TodoItem';

const FILTERS = {
  ALL: 'Tümü',
  ACTIVE: 'Aktif',
  COMPLETED: 'Bitti',
};

export default function Home() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('myTodos');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    localStorage.setItem('myTodos', JSON.stringify(todos));
  }, [todos]);

  // EKLEME
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // GÜNCELLEME
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // SİLME
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'ACTIVE') return !todo.isCompleted;
    if (filter === 'COMPLETED') return todo.isCompleted;
    return true;
  });

  const activeCount = todos.filter((t) => !t.isCompleted).length;
  const completedCount = todos.filter((t) => t.isCompleted).length;
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="app-wrap">
      <div className="header">
        <h1>Yapılacaklar Listesi</h1>
        <span>{todos.length} görev</span>
      </div>

      {/* İSTATİSTİK KARTI */}
      <div className="stats-card">
        <div className="stats-total">
          <span className="stats-total-num">{todos.length}</span>
          <span className="stats-total-label">Toplam</span>
        </div>
        <div className="stats-row">
          <div className="stats-item">
            <span className="stats-num active">{activeCount}</span>
            <span className="stats-label">Aktif</span>
          </div>
          <div className="stats-divider" />
          <div className="stats-item">
            <span className="stats-num done">{completedCount}</span>
            <span className="stats-label">Tamamlanan</span>
          </div>
        </div>
      </div>

      {/* EKLEME FORMU */}
      <div className="card">
        <form onSubmit={addTodo} className="add-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Bir şey ekle..."
          />
          <button type="submit">Ekle</button>
        </form>

        {/* İLERLEME ÇUBUĞU */}
        {todos.length > 0 && (
          <div className="progress-wrap">
            <div className="progress-label">
              <span>İlerleme</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* FİLTRELER */}
        <div className="filters">
          {Object.entries(FILTERS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={filter === key ? 'active' : ''}
            >
              {label}
            </button>
          ))}
        </div>

        {/* LİSTELEME */}
        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              {filter === 'ACTIVE' && completedCount === todos.length && todos.length > 0
                ? 'Harika! Tüm görevler tamamlandı.'
                : 'Burada hiçbir şey yok.'}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </ul>

        {/* ALT ÇUBUK */}
        {todos.length > 0 && (
          <div className="bottom-bar">
            <span>{activeCount} kaldı</span>
            {completedCount > 0 && (
              <button onClick={clearCompleted}>Tamamlananları Temizle</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}