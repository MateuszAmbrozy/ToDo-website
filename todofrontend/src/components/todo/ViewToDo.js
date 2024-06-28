import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import EnhancedTable from '../Table'; // Import tabeli

function ViewToDo() {
  const paperStyle = {
    padding: '20px',
    marginTop: '20px'
  };
  const [tasks, setTasks] = useState([]);

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
    <Paper elevation={3} style={{ ...paperStyle, marginTop: '20px' }}>
      <EnhancedTable tasks={tasks} fetchTasks={fetchTasks} />
    </Paper>
  );
}

export default ViewToDo;
