import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Typography, Paper, Button, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import DiscreteSlider from '../Slider'; // Import poprawiony

export default function UpdateToDo() {
  const { id } = useParams();

  const paperStyle = {
    padding: '20px',
    marginTop: '20px'
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [priority, setPriority] = useState(3);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Fetch the task details
    fetch(`http://localhost:8080/task/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
        setDueDate(data.dueDate);
        setIsCompleted(data.isCompleted);
        setPriority(data.priority);
      })
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      id,
      title,
      description,
      dueDate,
      isCompleted,
      priority
    };

    fetch(`http://localhost:8080/task/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
	  setUpdateSuccess(true);
      return response.json();
    })
	
    .catch(error => console.error('Error updating task:', error));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'blue' }}>
          Edit Task
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="dueDate"
            label="Due Date"
            variant="outlined"
            type="date"
            value={dueDate ? new Date(dueDate).toISOString().substr(0, 10) : ''}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <DiscreteSlider 
            value={priority} 
            onChange={(event, newValue) => setPriority(newValue)} 
          />
        </Box>
        <Typography variant="body1">
          Title: {title}
        </Typography>
        <Typography variant="body1">
          Description: {description}
        </Typography>
        <Typography variant="body1">
          Due Date: {dueDate}
        </Typography>
        <Typography variant="body1">
          Priority: {priority}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Completed"
        />
        <Button variant="contained" color="success" onClick={handleUpdate}>
          Update Task
        </Button>
      </Paper>

      {/* Snackbar for displaying update success message */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={updateSuccess}
        autoHideDuration={6000}
        onClose={() => setUpdateSuccess(false)}
        message="Task updated successfully!"
      />
    </Container>
  );
}
