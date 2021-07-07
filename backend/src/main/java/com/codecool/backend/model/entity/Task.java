package com.codecool.backend.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private TaskList list;

    @Column(nullable = false) private String name;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private Date deadline;
    @Column(nullable = false) private Long hoursEstimated;

    @Column(nullable = false)
    @ColumnDefault("CURRENT_DATE")
    private Date creationDate;
    private Date completionDate;
    private Long hoursWorked;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean completed;
    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean deleted;
}
