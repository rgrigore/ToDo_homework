import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from "react-bootstrap/cjs/ListGroup";
import Badge from "react-bootstrap/cjs/Badge";
import Button from "react-bootstrap/cjs/Button";

const Task = props => {
	const categoryColors = {
		test: "red",
		string: "purple",
		work: "blue",
		home: "orange",
		hobby: "magenta"
	};

	const categoryColor = {backgroundColor: categoryColors[props.task.category]}
	const daysRemaining = Math.max(Math.ceil(
		((new Date(props.task.deadline)).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24)
	), 0);

	return (
		<ListGroup.Item className={"container" + (props.task.completed ? " bg-success" : "")} style={{height: 60}}>
			<div className={"row align-items-center"}>
				<div className={"col-2 d-flex justify-content-center"}>
					{ props.task.name }
				</div>
				|
				<div className={"col-1 d-flex justify-content-center"}>
					<Badge pill variant={"info"} style={categoryColor}>{ props.task.category }</Badge>
				</div>
				|
				<div className={"col-2 d-flex justify-content-center"}>
					{ (new Date(props.task.deadline)).toDateString() }
				</div>
				|
				<div className={"col-1 d-flex justify-content-center"}>
					{ props.task.hoursEstimated }hrs
				</div>
				|
				<div className={"col-1 d-flex justify-content-center"}>
					<Badge pill variant={ daysRemaining > 1 || props.task.completed ? "warning" : "danger"}>{ daysRemaining } days</Badge>
				</div>
				|
				<div className={"col-2 d-flex justify-content-center"}>
					{ props.task.completed &&
						(new Date(props.task.completionDate)).toDateString()
					}
				</div>
				|
				<div className={"col-1 d-flex justify-content-center"}>
					{ props.task.completed &&
						props.task.hoursWorked + "hrs"
					}
				</div>
				|
				<div className={"col d-flex justify-content-end"}>
					{ !props.task.completed &&
						<span>
							<Button size={"sm"} variant={"success"} onClick={() => props.handleComplete(props.task.id)}>
								Done
							</Button>
							<Button size={"sm"} variant={"danger"} onClick={() => props.handleDelete(props.task.id)}>
								X
							</Button>
						</span>
					}
				</div>
			</div>
		</ListGroup.Item>
	);
};

Task.propTypes = {
	task: PropTypes.object.isRequired,
	handleComplete: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired
};

export default Task;