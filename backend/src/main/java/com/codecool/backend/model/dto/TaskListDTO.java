package com.codecool.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskListDTO {
    private Long id;
    private String name;
    private List<TaskDTO> tasks = new ArrayList<>();
}
