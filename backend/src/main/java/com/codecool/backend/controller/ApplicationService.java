package com.codecool.backend.controller;

import com.codecool.backend.model.dto.NewTaskDTO;
import com.codecool.backend.model.dto.TaskCompletionDTO;
import com.codecool.backend.model.dto.TaskDTO;
import com.codecool.backend.model.dto.TaskListDTO;
import com.codecool.backend.repository.AccountRepository;
import com.codecool.backend.repository.TaskListRepository;
import com.codecool.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ApplicationService {
    private final AccountRepository accountRepository;
    private final TaskListRepository taskListRepository;
    private final TaskRepository taskRepository;


    public TaskListDTO getTaskList(Long id) {
        return null;
    }

    public List<TaskDTO> getSortedTasks(Long listId, String value, String direction) {
        return null;
    }

    public void addNewTask(Long listId, NewTaskDTO newTask) {
    }

    public void completeTask(Long id, TaskCompletionDTO taskCompletion) {
    }

    public void deleteTask(Long id) {
    }
}
