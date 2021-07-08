import React from 'react';
import PropTypes from 'prop-types';
import Navbar from "react-bootstrap/cjs/Navbar";

const Header = props => {
	return (
		<Navbar bg={"dark"} variant={"dark"}>
			<Navbar.Collapse className={"justify-content-end"}>
				<Navbar.Text>
					Signed is as: <a href={"#"}>John Smith</a>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	);
};

Header.propTypes = {

};

export default Header;