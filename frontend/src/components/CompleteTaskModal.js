import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/cjs/Modal";
import Form from "react-bootstrap/cjs/Form";
import Button from "react-bootstrap/cjs/Button";

const CompleteTaskModal = props => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		setValidated(true);
		// props.handleDone(props.taskId, );
		// props.handleClose();
	}

	return (
		<Modal show={props.open} onHide={props.handleClose} size={"sm"} aria-labelledby={"complete-task-modal"} centered>
			<Modal.Header closeButton>
				<Modal.Title id={"complete-task-modal"}>Complete task</Modal.Title>
			</Modal.Header>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Modal.Body>
					<Form.Group controlId={"duration"}>
						<Form.Label>Time worked:</Form.Label>
						<Form.Control required type={"number"} min={1} placeholder={"hours"} />
						<Form.Control.Feedback type={"invalid"}>
							Needs to be a number greater than 0!
						</Form.Control.Feedback>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button size={"lg"} variant={"primary"} type={"submit"}>Done</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

CompleteTaskModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleDone: PropTypes.func.isRequired,
	taskId: PropTypes.number.isRequired
};

export default CompleteTaskModal;