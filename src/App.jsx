import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchTasks() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() })
      });
      if (res.ok) {
        setTitle('');
        fetchTasks();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to add');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleComplete(task) {
    try {
      await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeTask(id) {
    if (!confirm('Delete this task?')) return;
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Todo App</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
          style={{ padding: 8, width: '70%', marginRight: 8 }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Add</button>
      </form>

      {loading ? <p>Loading...</p> : <TodoList tasks={tasks} onToggle={toggleComplete} onDelete={removeTask} />}
    </div>
  );
}

export default App;
