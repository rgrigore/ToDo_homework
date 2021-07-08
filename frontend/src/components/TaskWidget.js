import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TaskContainer from "./TaskContainer";
import DropdownButton from "react-bootstrap/cjs/DropdownButton";
import Dropdown from "react-bootstrap/cjs/Dropdown";
import Button from "react-bootstrap/cjs/Button";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";

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

	const handleShow = () => setShowAdd(true);
	const handleHide = () => setShowAdd(false);

	const addTask = newTask => {

	}

	const selectSort = (value, direction) => {
		setSort({value: value, direction: direction});
	}

	useEffect(() => {
		setListToLoad(props.listId);
	}, [props.listId]);

	useEffect(() => {
		axios.get(
			`/list/${listToLoad}/get`
		).then(response => {
			setTaskList({
				name: response.data.name,
				id: response.data.id
			});
			setTasks(response.data.tasks);
		});
	}, [listToLoad]);

	useEffect(() => {
		axios.get(
			`/list/${taskList.id}/sorted`,
			{params: {
					value: sort.value,
					direction: sort.direction
				}}
		).then(response => setTasks(response.data));
		// eslint-disable-next-line
	}, [sort.value, sort.direction]);

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
				<TaskContainer tasks={tasks} />
			</div>
			<Button variant={"primary"} size={"lg"} className={'ml-auto mt-2'} onClick={handleShow}>Add task</Button>
			<AddTaskModal open={showAdd} handleClose={handleHide} handleAdd={addTask} />
		</div>
	);
};

TaskWidget.propTypes = {
	listId: PropTypes.number.isRequired
};

export default TaskWidget;