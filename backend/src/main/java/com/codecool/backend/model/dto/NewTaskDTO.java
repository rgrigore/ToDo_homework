package com.codecool.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewTaskDTO {
    private String name;
    private String category;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;
    private Long estimate;
}
