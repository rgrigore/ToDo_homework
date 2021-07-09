import React from 'react';
import Navbar from "react-bootstrap/cjs/Navbar";

const Header = () => {
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

export default Header;