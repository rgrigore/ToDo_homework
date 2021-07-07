package com.codecool.backend.controller;

import com.codecool.backend.model.dto.NewTaskDTO;
import com.codecool.backend.model.dto.TaskCompletionDTO;
import com.codecool.backend.model.dto.TaskDTO;
import com.codecool.backend.model.dto.TaskListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ApplicationController {
    private final ApplicationService service;

    @GetMapping("/list/{id}/get")
    public TaskListDTO getTaskList(@PathVariable("id") Long listId) {
        return service.getTaskList(listId);
    }

    @GetMapping("/list/{id}/sorted")
    public List<TaskDTO> getSortedTasks(@PathVariable("id") Long listId, @RequestParam String value, @RequestParam String direction) {
        return service.getSortedTasks(listId, value, direction);
    }

    @PostMapping("/list/{id}/add")
    public void addTask(@PathVariable("id") Long listId, NewTaskDTO newTask) {
        service.addNewTask(listId, newTask);
    }

    @PostMapping("/task/{id}/complete")
    public void completeTask(@PathVariable("id") Long taskId, TaskCompletionDTO taskCompletion) {
        service.completeTask(taskId, taskCompletion);
    }

    @PostMapping("/task/{id}/delete")
    public void deleteTask(@PathVariable("id") Long taskId) {
        service.deleteTask(taskId);
    }
}
