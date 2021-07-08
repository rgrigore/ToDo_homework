import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from "react-bootstrap/cjs/ListGroup";

const Task = props => {
	return (
		<ListGroup.Item style={{height: 60}}>

		</ListGroup.Item>
	);
};

Task.propTypes = {
	task: PropTypes.object.isRequired
};

export default Task;