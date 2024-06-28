import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Typography, Paper, Button } from '@mui/material';
import DiscreteSlider from './Slider'; // Import poprawiony
import EnhancedTable from './Table'; // Import tabeli

export default function Task() {
  const paperStyle = {
    padding: '20px',
    marginTop: '20px'
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validity, setValidity] = useState(3);
  const [tasks, setTasks] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      dueDate: new Date().toISOString(),
      isCompleted: false,
      priority: validity
    };

    fetch("http://localhost:8080/task/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log("New task added", data);
      fetchTasks(); // Reload tasks after adding a new one
    })
    .catch(error => console.error('Error:', error));
  };

  const fetchTasks = () => {
    fetch("http://localhost:8080/task")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        console.log("Tasks fetched:", result);
        setTasks(result);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'blue' }}>
          Add task
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
          <DiscreteSlider 
            value={validity} 
            onChange={(e, newValue) => setValidity(newValue)} 
          />
        </Box>
        <Typography variant="body1">
          Title: {title}
        </Typography>
        <Typography variant="body1">
          Description: {description}
        </Typography>
        <Typography variant="body1">
          Validity: {validity}
        </Typography>
        <Button variant="contained" color="success" onClick={handleClick}>
          Submit
        </Button>
      </Paper>


    </Container>
  );
}
