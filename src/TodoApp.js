import React, { useState, useMemo } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Styles object
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    wrapper: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.1rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '20px'
    },
    addTodoContainer: {
      display: 'flex',
      gap: '12px',
      alignItems: 'stretch'
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '1.1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    inputFocus: {
      borderColor: '#3b82f6'
    },
    addButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.2s'
    },
    addButtonHover: {
      backgroundColor: '#2563eb'
    },
    addButtonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '20px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#6b7280'
    },
    controlsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '300px'
    },
    searchInput: {
      width: '100%',
      padding: '8px 12px 8px 40px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    controlsRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    select: {
      padding: '8px 12px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    clearButton: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      border: '2px solid #fecaca',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.2s'
    },
    todoList: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      minHeight: '400px'
    },
    todoItem: {
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.2s'
    },
    todoItemHover: {
      backgroundColor: '#f9fafb'
    },
    todoItemCompleted: {
      backgroundColor: '#f9fafb'
    },
    checkbox: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: '2px solid #d1d5db',
      backgroundColor: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
      flexShrink: 0
    },
    checkboxCompleted: {
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      color: 'white'
    },
    todoContent: {
      flex: 1
    },
    todoText: {
      fontSize: '1.1rem',
      marginBottom: '4px',
      cursor: 'text',
      transition: 'color 0.2s'
    },
    todoTextCompleted: {
      color: '#6b7280',
      textDecoration: 'line-through'
    },
    todoDate: {
      fontSize: '0.8rem',
      color: '#9ca3af'
    },
    editInput: {
      width: '100%',
      padding: '8px 12px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '1.1rem',
      outline: 'none'
    },
    actionsContainer: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    },
    actionButton: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s'
    },
    editButton: {
      color: '#3b82f6',
      backgroundColor: 'transparent'
    },
    editButtonHover: {
      backgroundColor: '#dbeafe'
    },
    deleteButton: {
      color: '#dc2626',
      backgroundColor: 'transparent'
    },
    deleteButtonHover: {
      backgroundColor: '#fee2e2'
    },
    saveButton: {
      color: '#10b981',
      backgroundColor: 'transparent'
    },
    saveButtonHover: {
      backgroundColor: '#dcfce7'
    },
    cancelButton: {
      color: '#dc2626',
      backgroundColor: 'transparent'
    },
    cancelButtonHover: {
      backgroundColor: '#fee2e2'
    },
    emptyState: {
      padding: '48px 24px',
      textAlign: 'center',
      color: '#6b7280'
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '16px'
    },
    emptyTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#374151'
    },
    emptyText: {
      fontSize: '1.1rem',
      marginBottom: '20px'
    },
    emptyHints: {
      fontSize: '0.9rem',
      color: '#9ca3af'
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#6b7280',
      fontSize: '0.9rem'
    }
  };

  // Filter and search todos
  const filteredTodos = useMemo(() => {
    let filtered = todos.filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed);
      
      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'newest':
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return filtered;
  }, [todos, searchTerm, filter, sortBy]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
    if (e.key === 'Escape' && editingId) {
      cancelEdit();
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  }), [todos]);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>My To-Do List</h1>
          <p style={styles.subtitle}>Organize your tasks and stay productive</p>
        </div>

        {/* Add Todo */}
        <div style={styles.card}>
          <div style={styles.addTodoContainer}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, addTodo)}
              placeholder="What needs to be done?"
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              onClick={addTodo}
              disabled={!newTodo.trim()}
              style={{
                ...styles.addButton,
                ...(newTodo.trim() ? {} : styles.addButtonDisabled)
              }}
              onMouseEnter={(e) => {
                if (newTodo.trim()) e.target.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                if (newTodo.trim()) e.target.style.backgroundColor = '#3b82f6';
              }}
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: '#3b82f6'}}>{stats.total}</div>
              <div style={styles.statLabel}>Total Tasks</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: '#10b981'}}>{stats.completed}</div>
              <div style={styles.statLabel}>Completed</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: '#f59e0b'}}>{stats.active}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
          </div>
        )}

        {/* Controls */}
        {todos.length > 0 && (
          <div style={styles.card}>
            <div style={styles.controlsContainer}>
              <div style={styles.searchContainer}>
                <div style={{position: 'relative'}}>
                  <span style={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tasks..."
                    style={styles.searchInput}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <div style={styles.controlsRow}>
                <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={styles.select}
                  >
                    <option value="all">All Tasks</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={styles.select}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">A-Z</option>
                  </select>

                  {stats.completed > 0 && (
                    <button
                      onClick={clearCompleted}
                      style={styles.clearButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#fef2f2'}
                    >
                      Clear Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div style={styles.todoList}>
          {todos.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📝</div>
              <h3 style={styles.emptyTitle}>Your task list is empty</h3>
              <p style={styles.emptyText}>Add your first task above to get started!</p>
              <div style={styles.emptyHints}>
                <p>✓ Add tasks by typing and pressing Enter</p>
                <p>✓ Click the checkbox to mark as complete</p>
                <p>✓ Use the edit and delete buttons to manage tasks</p>
              </div>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🔍</div>
              <h3 style={styles.emptyTitle}>No tasks found</h3>
              <p style={styles.emptyText}>
                {searchTerm
                  ? `No tasks match "${searchTerm}"`
                  : filter === 'active'
                  ? 'No active tasks - great job!'
                  : filter === 'completed'
                  ? 'No completed tasks yet'
                  : 'No tasks match your current filter'
                }
              </p>
            </div>
          ) : (
            <div>
              {filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  style={{
                    ...styles.todoItem,
                    ...(todo.completed ? styles.todoItemCompleted : {}),
                    borderBottom: index === filteredTodos.length - 1 ? 'none' : '1px solid #f3f4f6'
                  }}
                  onMouseEnter={(e) => {
                    if (!todo.completed) e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = todo.completed ? '#f9fafb' : 'white';
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    style={{
                      ...styles.checkbox,
                      ...(todo.completed ? styles.checkboxCompleted : {})
                    }}
                    onMouseEnter={(e) => {
                      if (!todo.completed) e.target.style.borderColor = '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      if (!todo.completed) e.target.style.borderColor = '#d1d5db';
                    }}
                  >
                    {todo.completed && '✓'}
                  </button>

                  {/* Todo Content */}
                  <div style={styles.todoContent}>
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                        onBlur={saveEdit}
                        style={styles.editInput}
                        autoFocus
                      />
                    ) : (
                      <div onClick={() => !todo.completed && startEditing(todo.id, todo.text)}>
                        <div
                          style={{
                            ...styles.todoText,
                            ...(todo.completed ? styles.todoTextCompleted : {})
                          }}
                        >
                          {todo.text}
                        </div>
                        <div style={styles.todoDate}>
                          Created: {todo.createdAt.toLocaleDateString()} at {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={styles.actionsContainer}>
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          style={{...styles.actionButton, ...styles.saveButton}}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#dcfce7'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Save changes"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{...styles.actionButton, ...styles.cancelButton}}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Cancel editing"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          style={{...styles.actionButton, ...styles.editButton}}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#dbeafe'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Edit task"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          style={{...styles.actionButton, ...styles.deleteButton}}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Delete task"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div style={styles.footer}>
            {filteredTodos.length === todos.length
              ? `Showing all ${todos.length} task${todos.length === 1 ? '' : 's'}`
              : `Showing ${filteredTodos.length} of ${todos.length} task${todos.length === 1 ? '' : 's'}`
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;