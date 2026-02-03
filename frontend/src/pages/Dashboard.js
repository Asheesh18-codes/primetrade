import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, getTasks, deleteTask } from '../services/api';

const inputStyle = { width: '100%', padding: '8px', marginBottom: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' };
const btnStyle = { padding: '8px 16px', backgroundColor: '#667eea', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' };
const deleteBtn = { padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' };
const logoutBtn = { padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '13px' };

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    else fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      setTasks((await getTasks()).data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask(title, description);
      setMessage('Task created!');
      setTitle('');
      setDescription('');
      fetchTasks();
      setTimeout(() => setMessage(''), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setMessage('Task deleted!');
      fetchTasks();
      setTimeout(() => setMessage(''), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', backgroundColor: 'white', padding: '15px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Dashboard</h2>
        <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} style={logoutBtn}>Logout</button>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '25px' }}>
        <h3 style={{ marginBottom: '12px', color: '#333' }}>Create Task</h3>
        <form onSubmit={handleCreateTask}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inputStyle, minHeight: '60px' }} />
          <button type="submit" style={btnStyle}>Create</button>
        </form>
        {message && <p style={{ marginTop: '10px', color: message.includes('created') || message.includes('deleted') ? '#28a745' : '#dc3545', fontSize: '12px' }}>{message}</p>}
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '12px', color: '#333' }}>Tasks</h3>
        {tasks.length === 0 ? (
          <p style={{ color: '#666', fontSize: '13px' }}>No tasks yet</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}>{task.id}</td>
                  <td style={{ padding: '8px' }}>{task.title}</td>
                  <td style={{ padding: '8px' }}>{task.description}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => handleDeleteTask(task.id)} style={deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
