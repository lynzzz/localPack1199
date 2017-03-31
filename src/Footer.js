import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

	render() {
		var style = {
			backgroundColor: "#5c6bc0",
			borderTop: "1px solid #3F51B5",
			textAlign: "center",
			padding: "10px",
			position: "fixed",
			left: "0",
			bottom: "0",
			height: "35px",
			width: "100%",
			color: "#e1ffff",
		};

		var phantom = {
			display: 'block',
			padding: '20px',
			height: '60px',
			width: '100%',
		}
	
		return (
			<div>
                <div style={phantom} />
                <div style={style}>
                        Copyright &copy; 2017 Bethesda SoftTech LLC.
                </div>
            </div>
		);
	};
}
export default Footer;