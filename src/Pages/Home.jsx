import { useState, useEffect } from 'react';
import TodoItem from '../Components/TodoItem';

export default function Home() {
  // 1. STATE VE LOCALSTORAGE (Read)
  // İlk açılışta localStorage'ı kontrol eder, veri varsa alır, yoksa boş dizi döner.
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('myTodos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');

  // State her değiştiğinde localStorage'ı günceller
  useEffect(() => {
    localStorage.setItem('myTodos', JSON.stringify(todos));
  }, [todos]);

  // 2. EKLEME İŞLEMİ (Create)
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return; // Boş eklemeyi engelle

    const newTodo = {
      id: Date.now(), // Benzersiz ID
      text: inputValue,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(''); // Input'u temizle
  };

  // 3. GÜNCELLEME İŞLEMİ (Update) - Tamamlandı durumunu değiştir
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

  return (
    <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Gelişmiş Todo App
      </h1>

      {/* Ekleme Formu */}
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Yeni bir görev ekle..."
          className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded font-semibold transition-colors"
        >
          Ekle
        </button>
      </form>

      {/* Listeleme Alanı */}
      <ul>
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">Henüz bir görev eklemedin.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}