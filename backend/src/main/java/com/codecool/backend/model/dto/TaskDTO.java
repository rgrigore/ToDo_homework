package com.codecool.backend.model.dto;

import com.codecool.backend.model.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long id;
    private String name;
    private String category;
    private LocalDate deadline;
    private Long hoursEstimated;
    private LocalDateTime creationDate;
    private LocalDateTime completionDate;
    private Long hoursWorked;
    private Boolean completed;


    public static TaskDTO of(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .name(task.getName())
                .category(task.getCategory())
                .deadline(task.getDeadline())
                .hoursEstimated(task.getHoursEstimated())
                .creationDate(task.getCreationDate())
                .completionDate(task.getCompletionDate())
                .hoursWorked(task.getHoursWorked())
                .completed(task.getCompleted())
                .build();
    }
}
