package com.codecool.backend.controller;

import com.codecool.backend.model.dto.NewTaskDTO;
import com.codecool.backend.model.dto.TaskCompletionDTO;
import com.codecool.backend.model.dto.TaskDTO;
import com.codecool.backend.model.dto.TaskListDTO;
import com.codecool.backend.model.entity.Task;
import com.codecool.backend.model.entity.TaskList;
import com.codecool.backend.repository.AccountRepository;
import com.codecool.backend.repository.TaskListRepository;
import com.codecool.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ApplicationService {

    private final static Long HARDCODED_LIST_ID = 0L;

    private final AccountRepository accountRepository;
    private final TaskListRepository taskListRepository;
    private final TaskRepository taskRepository;


    public TaskListDTO getTaskList(Long id) {
        AtomicReference<TaskListDTO> taskListDTO = new AtomicReference<>();

//        taskListRepository.findById(id).ifPresent(taskList -> {
            taskListDTO.set(TaskListDTO.builder()
//                    .id(taskList.getId())
                    .id(HARDCODED_LIST_ID)
//                    .name(taskList.getName())
                    .name("List title")
                    .tasks(
                            sort(
//                                    taskList.getTasks().stream()
                                    taskRepository.findAllByListId(HARDCODED_LIST_ID).stream()
                                            .filter(task -> !task.getDeleted())
                                            .map(TaskDTO::of),
                                    "created", "asc"
                            )
                    )
                    .build()
            );
//        });

        return taskListDTO.get();
    }

    public List<TaskDTO> getSortedTasks(Long listId, String value, String direction) {
        return sort(
//                taskListRepository.findById(listId).map(TaskList::getTasks).orElse(new ArrayList<>()).stream()
                taskRepository.findAllByListId(HARDCODED_LIST_ID).stream()
                        .filter(task -> !task.getDeleted())
                        .map(TaskDTO::of),
                value, direction
        );
    }

    public void addNewTask(Long listId, NewTaskDTO newTask) {
        if (newTask.getDeadline().isBefore(LocalDate.now())) {
            return;
        }
        if (newTask.getEstimate() < 0) {
            return;
        }

//        taskListRepository.findById(listId).ifPresent(taskList -> {
            taskRepository.save(
                    Task.builder()
//                            .list(taskList)
                            .listId(HARDCODED_LIST_ID)
                            .name(newTask.getName())
                            .category(newTask.getCategory())
                            .deadline(newTask.getDeadline())
                            .hoursEstimated(newTask.getEstimate())
                            .creationDate(LocalDateTime.now())
                            .completed(false)
                            .deleted(false)
                            .build()
            );
//        });
    }

    public void completeTask(Long id, TaskCompletionDTO taskCompletion) {
        taskRepository.findById(id).ifPresent(task -> {
            if (!task.getCompleted() && !task.getDeleted()) {
                task.setHoursWorked(taskCompletion.getHoursWorked());
                task.setCompletionDate(LocalDateTime.now());
                task.setCompleted(true);
                taskRepository.save(task);
            }
        });
    }

    public void deleteTask(Long id) {
        taskRepository.findById(id).ifPresent(task -> {
            if (!task.getCompleted()) {
                task.setDeleted(true);
                taskRepository.save(task);
            }
        });
    }


    public List<TaskDTO> sort(Stream<TaskDTO> tasks, String value, String direction) {
        switch (value.toLowerCase()) {
            case "created":
                return tasks.sorted(
                        direction.equalsIgnoreCase("asc") ?
                        Comparator.comparing(TaskDTO::getCreationDate) :
                        Comparator.comparing(TaskDTO::getCreationDate).reversed()
                ).collect(Collectors.toList());
            case "deadline":
                return tasks.sorted(
                        direction.equalsIgnoreCase("asc") ?
                                Comparator.comparing(TaskDTO::getDeadline) :
                                Comparator.comparing(TaskDTO::getDeadline).reversed()
                ).collect(Collectors.toList());
            default: return tasks.collect(Collectors.toList());
        }
    }
}
