import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TaskContainer from "./TaskContainer";
import DropdownButton from "react-bootstrap/cjs/DropdownButton";
import Dropdown from "react-bootstrap/cjs/Dropdown";
import Button from "react-bootstrap/cjs/Button";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";
import CompleteTaskModal from "./CompleteTaskModal";

const TaskWidget = props => {
	const [listToLoad, setListToLoad] = useState(0);
	const [taskList, setTaskList] = useState({
		name: "List Title",
		id: 0
	})
	const [tasks, setTasks] = useState([])
	const [sort, setSort] = useState({
		value: "created",
		direction: "asc"
	})

	const [showAdd, setShowAdd] = useState(false);
	const handleShowAdd = () => setShowAdd(true);
	const handleHideAdd = () => setShowAdd(false);

	const [showComplete, setShowComplete] = useState(false);
	const [taskToComplete, setTaskToComplete] = useState(-1);
	const handleShowComplete = () => setShowComplete(true);
	const handleHideComplete = () => setShowComplete(false);

	useEffect(() => {
		setListToLoad(props.listId);
	}, [props.listId]);

	useEffect(() => {
		axios.get(
			`/list/${listToLoad}/get`
		).then(r => {
			setTaskList({
				name: r.data.name,
				id: r.data.id
			});
			setTasks(r.data.tasks);
		});
	}, [listToLoad]);

	useEffect(() => {
		loadTasks();
		// eslint-disable-next-line
	}, [sort.value, sort.direction]);

	const loadTasks = () => {
		axios.get(
			`/list/${taskList.id}/sorted`,
			{params: {
					value: sort.value,
					direction: sort.direction
				}}
		).then(r => setTasks(r.data));
	}

	const selectSort = (value, direction) => {
		setSort({value: value, direction: direction});
	}

	const handleCompleteTask = taskId => {
		setTaskToComplete(taskId);
		handleShowComplete();
	}

	const finishTask = (taskId, time) => {
		axios.post(
			`/task/${taskId}/complete`,
			{hoursWorked: time}
		).then(() => loadTasks());
	}

	const deleteTask = taskId => {
		axios.post(
			`/task/${taskId}/delete`,
		).then(() => loadTasks());
	}

	const addTask = newTask => {
		axios.post(
			`/list/${taskList.id}/add`,
			newTask
		).then(() => loadTasks());
	}

	return (
		<div className={'d-flex flex-column mx-auto w-75 h-100'}>
			<h3 className={'text-center pb-1'}>{ taskList.name }</h3>
			<div className={'d-flex flex-column mx-auto w-100 h-100'} style={{backgroundColor: "grey"}}>
				<div className={'d-flex align-items-center p-3'}>
					<span className={'ml-auto mr-1'}>sort by:</span>
					<DropdownButton title={ sort.value + " " + sort.direction } size={"sm"}>
						<Dropdown.Item as={"button"} onClick={() => selectSort("created", "asc")}>created asc</Dropdown.Item>
						<Dropdown.Item as={"button"} onClick={() => selectSort("created", "desc")}>created desc</Dropdown.Item>
						<Dropdown.Item as={"button"} onClick={() => selectSort("deadline", "asc")}>deadline asc</Dropdown.Item>
						<Dropdown.Item as={"button"} onClick={() => selectSort("deadline", "desc")}>deadline desc</Dropdown.Item>
					</DropdownButton>
				</div>
				<TaskContainer tasks={tasks} handleComplete={handleCompleteTask} handleDelete={deleteTask} />
			</div>
			<Button variant={"primary"} size={"lg"} className={'ml-auto mt-2'} onClick={handleShowAdd}>Add task</Button>

			<AddTaskModal open={showAdd} handleClose={handleHideAdd} handleAdd={addTask} />
			<CompleteTaskModal open={showComplete} handleClose={handleHideComplete} handleDone={finishTask} taskId={taskToComplete} />
		</div>
	);
};

TaskWidget.propTypes = {
	listId: PropTypes.number.isRequired
};

export default TaskWidget;