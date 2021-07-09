import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/cjs/Modal";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/cjs/Form"

const AddTaskModal = props => {
	const currentDate = new Date();
	const month = currentDate.getMonth() + 1;
	const date = currentDate.getDate();
	const currentDateString = `${currentDate.getFullYear()}-${month < 10 ? '0'+month : month}-${date < 10 ? '0'+date : date}`;

	const [validated, setValidated] = useState(false);

	const handleSubmit = e => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			props.handleAdd({
				name: form.elements.name.value,
				category: form.elements.category.value,
				deadline: form.elements.deadline.value,
				estimate: form.elements.estimation.value
			});
			props.handleClose();
		}

		setValidated(true);
	}

	return (
		<Modal show={props.open} onHide={props.handleClose} size={"md"} centered aria-labelledby={"add-task-modal"}>
			<Modal.Header closeButton>
				<Modal.Title id={"add-task-modal"}>Add task</Modal.Title>
			</Modal.Header>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Modal.Body>
					<Form.Group controlId={"name"}>
						<Form.Label>Name</Form.Label>
						<Form.Control required type={"text"} placeholder={"name"} />
						<Form.Control.Feedback type={"invalid"}>
							Must provide a name!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId={"category"}>
						<Form.Label>Category</Form.Label>
						<Form.Control as={"select"} required>
							<option value={"work"}>Work</option>
							<option value={"home"}>Home</option>
							<option value={"hobby"}>Hobby</option>
						</Form.Control>
						<Form.Control.Feedback type={"invalid"}>
							Must select a category from the list!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId={"deadline"}>
						<Form.Label>Deadline</Form.Label>
						<Form.Control required type={"date"} min={currentDateString} />
						<Form.Control.Feedback type={"invalid"}>
							Must select a date in the future!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId={"estimation"}>
						<Form.Label>Duration estimation</Form.Label>
						<Form.Control required type={"number"} min={1} aria-describedby={"duration-helper"} />
						<Form.Text id={"duration-helper"} muted>
							The value is in hours.
						</Form.Text>
						<Form.Control.Feedback type={"invalid"}>
							Must be a duration longer than 0!
						</Form.Control.Feedback>
					</Form.Group>
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