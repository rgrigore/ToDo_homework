package com.codecool.backend.repository;

import com.codecool.backend.model.entity.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {
    Optional<TaskList> findById(Long id);
}
