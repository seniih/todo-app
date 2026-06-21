import { useState, useEffect } from 'react';
import TodoItem from '../Components/TodoItem';

const FILTER_TYPES = {
  ALL: 'Tümü',
  ACTIVE: 'Aktif',
  COMPLETED: 'Tamamlanan',
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

  // 2. EKLEME İŞLEMİ (Create)
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

  // 3. GÜNCELLEME İŞLEMİ (Update)
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // 4. SİLME İŞLEMİ (Delete)
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

  const completedCount = todos.filter((t) => t.isCompleted).length;
  const activeCount = todos.filter((t) => !t.isCompleted).length;
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      {/* Başlık */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
        }}>
          <span style={{ fontSize: '36px' }}>✅</span>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            TaskFlow
          </h1>
        </div>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
          Görevlerini yönet, odaklan, başar.
        </p>
      </div>

      {/* Ana Kart */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
      }}>

        {/* İstatistik Kartları */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Toplam', value: todos.length, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
            { label: 'Aktif', value: activeCount, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
            { label: 'Tamamlanan', value: completedCount, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: stat.bg,
              border: `1px solid ${stat.color}30`,
              borderRadius: '14px',
              padding: '14px 10px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.6rem', fontWeight: '700', color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* İlerleme Çubuğu */}
        {todos.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>İlerleme</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#a78bfa' }}>{progress}%</span>
            </div>
            <div style={{
              height: '6px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '99px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                borderRadius: '99px',
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        )}

        {/* Ekleme Formu */}
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Yeni bir görev ekle..."
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.07)',
              color: '#f1f5f9',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#a78bfa'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
          />
          <button
            type="submit"
            style={{
              padding: '14px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              color: 'white',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.1s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.85'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            + Ekle
          </button>
        </form>

        {/* Filtre Butonları */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          padding: '4px',
        }}>
          {Object.entries(FILTER_TYPES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '9px',
                border: 'none',
                background: filter === key
                  ? 'linear-gradient(135deg, #a78bfa, #60a5fa)'
                  : 'transparent',
                color: filter === key ? 'white' : '#94a3b8',
                fontWeight: filter === key ? '600' : '400',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Listeleme Alanı */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filteredTodos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 0',
              color: '#64748b',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
                {filter === 'COMPLETED' ? '🎉' : '📝'}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                {filter === 'COMPLETED'
                  ? 'Henüz tamamlanan görev yok.'
                  : filter === 'ACTIVE'
                  ? 'Harika! Tüm görevler tamamlandı.'
                  : 'Henüz görev eklemedin.'}
              </p>
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

        {/* Alt Bilgi */}
        {todos.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {activeCount} görev kaldı
            </span>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(248,113,113,0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Tamamlananları Temizle
              </button>
            )}
          </div>
        )}
      </div>

      {/* Alt Yazı */}
      <p style={{
        textAlign: 'center',
        marginTop: '24px',
        color: '#475569',
        fontSize: '0.78rem',
      }}>
        Veriler tarayıcınızda güvenle saklanıyor ✦ LocalStorage
      </p>
    </div>
  );
}