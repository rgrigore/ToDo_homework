import React from 'react';
import PropTypes from 'prop-types';
import Container from "react-bootstrap/cjs/Container";
import TaskWidget from "./TaskWidget";

const Main = props => {
	return (
		<Container fluid className={'pt-5 h-75'}>
			<TaskWidget />
		</Container>
	);
};

Main.propTypes = {

};

export default Main;