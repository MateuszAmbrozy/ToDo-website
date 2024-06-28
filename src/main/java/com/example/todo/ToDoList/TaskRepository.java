package com.example.todo.ToDoList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>
{
    @Query("SELECT s FROM Task s where s.title = ?1")
    Optional<Task> findTaskByTitle(String title);

    long countByIsCompleted(boolean isCompleted);
}

