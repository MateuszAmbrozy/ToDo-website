import React, { useState, useEffect } from 'react';

export default function Home() {
  const [tasksNum, setTotal] = useState(0); 
  const [tasksCompletedNum, setCompleted] = useState(0); 

  useEffect(() => {
    // Fetch total number of tasks
    fetch("http://localhost:8080/task/getNumOfTasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setTotal(data);
    })
    .catch(error => console.error('Error:', error));

    // Fetch number of completed tasks
    fetch("http://localhost:8080/task/getNumOfCompletedTasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setCompleted(data);
    })
    .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="text-center">
      <h1>Home</h1>
      <p>This is todo list app version 1.0.0 by Mateusz Ambroży 264240</p>
      <p>Total tasks: {tasksNum}</p>
      <p>Completed tasks: {tasksCompletedNum}</p>
    </div>
  );
}
