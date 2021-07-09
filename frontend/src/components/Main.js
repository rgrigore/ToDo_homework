import React from 'react';
import Container from "react-bootstrap/cjs/Container";
import TaskWidget from "./TaskWidget";

const Main = () => {
	return (
		<Container fluid className={'pt-5 h-75'}>
			<TaskWidget listId={0} /> {/* This is where u would choose the list of tasks to load */}
		</Container>
	);
};

export default Main;