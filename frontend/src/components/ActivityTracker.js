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
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function ActivityTracker() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    task_name: '',
    category: '',
    start_time: null,
    end_time: null,
    notes: '',
  });

  const categories = [
    'Work',
    'Personal',
    'Exercise',
    'Learning',
    'Health',
    'Social',
    'Entertainment',
    'Other'
  ];

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (newActivity.task_name.trim() === '' || !newActivity.start_time || !newActivity.end_time) return;
    
    setActivities([...activities, {
      id: Date.now(),
      ...newActivity
    }]);
    
    setNewActivity({
      task_name: '',
      category: '',
      start_time: null,
      end_time: null,
      notes: '',
    });
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    return date.toLocaleString([], { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    const duration = (endTime - startTime) / (1000 * 60); // minutes
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Activity Tracker
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleAddActivity}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Task Name"
                value={newActivity.task_name}
                onChange={(e) => setNewActivity({ ...newActivity, task_name: e.target.value })}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
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
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Time"
                  value={newActivity.start_time}
                  onChange={(newValue) => setNewActivity({ ...newActivity, start_time: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="End Time"
                  value={newActivity.end_time}
                  onChange={(newValue) => setNewActivity({ ...newActivity, end_time: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                value={newActivity.notes}
                onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                variant="outlined"
                multiline
                rows={3}
                placeholder="Add any additional notes..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Add Activity
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <List>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            sx={{
              bgcolor: 'background.paper',
              mb: 2,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {activity.task_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Category: {activity.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(activity.start_time)} - {formatDateTime(activity.end_time)}
                </Typography>
                <Typography variant="body2" color="primary">
                  Duration: {calculateDuration(activity.start_time, activity.end_time)}
                </Typography>
                {activity.notes && (
                  <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                    Notes: {activity.notes}
                  </Typography>
                )}
              </Box>
              <IconButton
                onClick={() => handleDeleteActivity(activity.id)}
                color="error"
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      
      {activities.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No activities tracked yet. Add your first activity above!
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default ActivityTracker;