import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from "react-bootstrap/cjs/ListGroup";
import Task from "./Task";

const TaskContainer = props => {
	return (
		<div className={"flex-fill border rounded scrollbar-hidden"} style={{overflow: "auto", backgroundColor: "lightgrey"}}>
			<ListGroup>
				{props.tasks.map((task, index) => (
					<Task key={index} task={task} handleComplete={props.handleComplete} handleDelete={props.handleDelete} />
				))}
			</ListGroup>
		</div>
	);
};

TaskContainer.propTypes = {
	tasks: PropTypes.array.isRequired,
	handleComplete: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired
};

export default TaskContainer;