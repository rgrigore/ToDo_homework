import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/cjs/Modal";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/cjs/Form"

const AddTaskModal = props => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = () => {
		// TODO Validation
		props.handleAdd();
		props.handleClose();
	}

	return (
		<Modal show={props.open} onHide={props.handleClose} size={"lg"} centered aria-labelledby={"add-task-modal"}>
			<Modal.Header closeButton>
				<Modal.Title id={"add-task-modal"}>Add task</Modal.Title>
			</Modal.Header>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Modal.Body>

				</Modal.Body>
				<Modal.Footer>
					<Button size={"lg"} variant={"primary"} type={"submit"}>Add</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

AddTaskModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleAdd: PropTypes.func.isRequired
};

export default AddTaskModal;