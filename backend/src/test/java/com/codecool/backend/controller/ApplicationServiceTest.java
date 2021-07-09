package com.codecool.backend.controller;

import com.codecool.backend.model.dto.TaskDTO;
import com.codecool.backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@ContextConfiguration(classes = {ApplicationService.class})
@ExtendWith(SpringExtension.class)
class ApplicationServiceTest {

    @MockBean
    private TaskRepository taskRepository;

    @Autowired
    private ApplicationService applicationService;

    @Test
    void sortCreatedAsc() {
        Stream<TaskDTO> tasks = Stream.of(
                TaskDTO.builder().id(0L).creationDate(LocalDateTime.of(2020, 1, 5, 12, 20, 0)).build(),
                TaskDTO.builder().id(1L).creationDate(LocalDateTime.of(2020, 11, 1, 12, 20, 0)).build(),
                TaskDTO.builder().id(2L).creationDate(LocalDateTime.of(2020, 1, 1, 12, 20, 0)).build(),
                TaskDTO.builder().id(3L).creationDate(LocalDateTime.of(2020, 1, 5, 17, 20, 0)).build()
        );
        String sortValue = "created";
        String sortOrder = "asc";

        List<Long> expected = Arrays.asList(2L, 0L, 3L, 1L);

        List<Long> result = this.applicationService.sort(tasks, sortValue, sortOrder).stream().map(TaskDTO::getId).collect(Collectors.toList());

        assertIterableEquals(expected, result);
    }

    @Test
    void sortCreatedDesc() {
        Stream<TaskDTO> tasks = Stream.of(
                TaskDTO.builder().id(0L).creationDate(LocalDateTime.of(2020, 1, 5, 12, 20, 0)).build(),
                TaskDTO.builder().id(1L).creationDate(LocalDateTime.of(2020, 11, 1, 12, 20, 0)).build(),
                TaskDTO.builder().id(2L).creationDate(LocalDateTime.of(2020, 1, 1, 12, 20, 0)).build(),
                TaskDTO.builder().id(3L).creationDate(LocalDateTime.of(2020, 1, 5, 17, 20, 0)).build()
        );
        String sortValue = "created";
        String sortOrder = "desc";

        List<Long> expected = Arrays.asList(1L, 3L, 0L, 2L);

        List<Long> result = this.applicationService.sort(tasks, sortValue, sortOrder).stream().map(TaskDTO::getId).collect(Collectors.toList());

        assertIterableEquals(expected, result);
    }

    @Test
    void sortDeadlineAsc() {
        Stream<TaskDTO> tasks = Stream.of(
                TaskDTO.builder().id(0L).deadline(LocalDate.of(2020, 6, 1)).build(),
                TaskDTO.builder().id(1L).deadline(LocalDate.of(2020, 1, 1)).build(),
                TaskDTO.builder().id(2L).deadline(LocalDate.of(2025, 1, 1)).build(),
                TaskDTO.builder().id(3L).deadline(LocalDate.of(2020, 1, 5)).build()
        );
        String sortValue = "deadline";
        String sortOrder = "asc";

        List<Long> expected = Arrays.asList(1L, 3L, 0L, 2L);

        List<Long> result = this.applicationService.sort(tasks, sortValue, sortOrder).stream().map(TaskDTO::getId).collect(Collectors.toList());

        assertIterableEquals(expected, result);
    }

    @Test
    void sortDeadlineDesc() {
        Stream<TaskDTO> tasks = Stream.of(
                TaskDTO.builder().id(0L).deadline(LocalDate.of(2020, 6, 1)).build(),
                TaskDTO.builder().id(1L).deadline(LocalDate.of(2020, 1, 1)).build(),
                TaskDTO.builder().id(2L).deadline(LocalDate.of(2025, 1, 1)).build(),
                TaskDTO.builder().id(3L).deadline(LocalDate.of(2020, 1, 5)).build()
        );
        String sortValue = "deadline";
        String sortOrder = "desc";

        List<Long> expected = Arrays.asList(2L, 0L, 3L, 1L);

        List<Long> result = this.applicationService.sort(tasks, sortValue, sortOrder).stream().map(TaskDTO::getId).collect(Collectors.toList());

        assertIterableEquals(expected, result);
    }
}