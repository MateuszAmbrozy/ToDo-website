package com.example.todo.ToDoList;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TaskService
{
    private final TaskRepository taskRepository;

    @Autowired
    TaskService(TaskRepository taskRepository)
    {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTask()
    {
        return taskRepository.findAll();
    }
    public Task getOneTask(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task " + id + " does not exist"));
    }
    public long getNumOfTasks()
    {
        return taskRepository.count();
    }
    public long getNumOfCompletedTasks()
    {
        return taskRepository.countByIsCompleted(true);
    }

    public void addNewTask(Task task)
    {
        Optional<Task> taskOptional = taskRepository.findTaskByTitle(task.getTitle());
        if(taskOptional.isPresent())
        {
            throw new IllegalArgumentException("Task title already exists");
        }
        taskRepository.save(task);
    }
    public void deleteTask(Long id)
    {
       boolean exists =  taskRepository.existsById(id);
        if(!exists)
        {
            throw new IllegalArgumentException("Task " + id + " does not exist");
        }
        taskRepository.deleteById(id);
    }
    @Transactional
    public void updateTask(Long id, String title, String description, boolean isCompleted)
    {
        Task task =  taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task " + id + " not found"));

        if(title != null && !title.isEmpty() && !Objects.equals((task.getTitle()), title))
            task.setTitle(title);

        if(description != null && !description.isEmpty() && !Objects.equals((task.getDescription()), description))
            task.setDescription(description);


        System.out.println("Updating isCompleted to: " + isCompleted);
        task.setCompleted(isCompleted);

        taskRepository.save(task);
        System.out.println("Task updated successfully");
    }
}
