import React from 'react';

export default function TodoList({ tasks, onToggle, onDelete }) {
  if (!tasks || tasks.length === 0) return <p>No tasks</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((t) => (
        <li key={t.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <input type="checkbox" checked={t.completed} onChange={() => onToggle(t)} />
          <span style={{ flex: 1, marginLeft: 8, textDecoration: t.completed ? 'line-through' : 'none' }}>
            {t.title}
          </span>
          <button onClick={() => onDelete(t.id)} style={{ marginLeft: 8 }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
