import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Collapse,
  IconButton as MuiIconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    text: '',
    category: '',
    notes: '',
  });
  const [expandedId, setExpandedId] = useState(null);

  // Predefined categories - you can modify these
  const categories = [
    'Work',
    'Personal',
    'Shopping',
    'Health',
    'Education',
    'Other'
  ];

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.text.trim() === '') return;
    
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo.text,
      category: newTodo.category,
      notes: newTodo.notes,
      completed: false
    }]);
    
    setNewTodo({
      text: '',
      category: '',
      notes: ''
    });
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleAddTodo}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={newTodo.text}
                onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
                placeholder="Add a new task..."
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={newTodo.category}
                  onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={newTodo.notes}
                onChange={(e) => setNewTodo({ ...newTodo, notes: e.target.value })}
                placeholder="Add notes (optional)..."
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Todo
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <List>
        {todos.map((todo) => (
          <Paper key={todo.id} sx={{ mb: 1 }}>
            <ListItem
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={todo.text}
                secondary={todo.category}
                sx={{
                  '& .MuiListItemText-primary': {
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.disabled' : 'text.primary',
                  },
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleToggleComplete(todo.id)}
                  sx={{ mr: 1 }}
                  color={todo.completed ? "success" : "default"}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleExpandClick(todo.id)}
                  sx={{ mr: 1 }}
                >
                  {expandedId === todo.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteTodo(todo.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={expandedId === todo.id}>
              <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">
                  {todo.notes || 'No notes added'}
                </Typography>
              </Box>
            </Collapse>
          </Paper>
        ))}
      </List>
    </Box>
  );
}

export default TodoList;