package com.codecool.backend.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private TaskList list;

    @Column(nullable = false) private String name;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private Long hoursEstimated;
    @Column(nullable = false) private LocalDate deadline;

//    @Column(columnDefinition = "timestamp default CURRENT_TIMESTAMP")
    @Column(nullable = false)
    private LocalDateTime creationDate;
    private LocalDateTime completionDate;
    private Long hoursWorked;

//    @Column(columnDefinition = "boolean default false")
    @Column(nullable = false)
    private Boolean completed;
//    @Column(columnDefinition = "boolean default false")
    @Column(nullable = false)
    private Boolean deleted;
}
