import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [completedFilter, setCompletedFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {import React, { useState } from 'react';
  import './App.css';
  
  function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    };
  
    const handleDelete = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  
    const handleComplete = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    };
  
    const filteredTodos = (completed) => {
      return todos.filter((todo) => todo.isCompleted === completed);
    };
  
    return (
      <div className="App">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter todo"
            value={inputValue}
            onChange={handleChange}
          />
          <button type="submit">Add Todo</button>
        </form>
        <div>
          <h2>Active Todos</h2>
          <ul>
            {filteredTodos(false).map((todo) => (
              <li key={todo.id}>
                <span
                  style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleComplete(todo.id)}>
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Completed Todos</h2>
          <ul>
            {filteredTodos(true).map((todo) => (
              <li key={todo.id}>
                <span
                  style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleComplete(todo.id)}>
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  
  export default App;
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setCompletedFilter(filter);
  };

  const filteredTodos = todos.filter((todo) =>
    completedFilter === 'all' ? true : todo.completed === (completedFilter === 'completed')
  );

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        <label>
          Filter:
          <select value={completedFilter} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </label>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
