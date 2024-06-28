package com.example.todo.ToDoList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin
public class TaskController
{

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @GetMapping("")
    public List<Task> getTask()
    {
        return taskService.getTask();
    }
    @GetMapping("/getNumOfTasks")
    public long getNumOfTasks()
    {
        return taskService.getNumOfTasks();
    }
    @GetMapping("/getNumOfCompletedTasks")
    public long getNumOfCompletedTasks()
    {
        return taskService.getNumOfCompletedTasks();
    }

    @GetMapping("/{id}")
    public Task getOneTask(@PathVariable("id") Long id)
    {
        return taskService.getOneTask(id);
    }

    @PostMapping("/add")
    public void addNewTask(@RequestBody Task task)
    {
        taskService.addNewTask(task);
    }

    @DeleteMapping(path = "/delete/{taskId}")
    public void deleteTask(@PathVariable("taskId") Long id)
    {
        taskService.deleteTask(id);
    }

    @PutMapping(path = "/update/{taskId}")
    public void updateTask(@PathVariable("taskId") Long id, @RequestBody Task updatedTask) {
        taskService.updateTask(id, updatedTask.getTitle(), updatedTask.getDescription(), updatedTask.isCompleted());
    }



}
