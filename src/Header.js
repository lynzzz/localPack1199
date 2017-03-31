import React, { Component } from 'react';
import './Header.css';


class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		// this.onSignOut = this.onSignOut.bind(this);
	}

	// onSignOut(e){
	// 	// console.log('submit');
	// 	e.preventDefault();
	// 	this.props.onSignOut(this.props.appModule);	
	// }

	render() {
		let headerMessage = "";
		if (this.props.components.user != null) {
			headerMessage = "Welcome " + this.props.components.user.firstName + "    "
		}

		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<a href="/" onClick={this.props.components.transition}>
							<img src="/imgs/cubscout.gif" alt="" height="60" />							
						</a>
						PACK 1199
					</div>
					<div className="welcome-message">
						{headerMessage}
						{
							(this.props.components.user!=null) ? 
							<a href="/logout" onClick={this.props.components.transition}><span className="glyphicon glyphicon-log-out"></span> Sign Out</a> :
							<a href="/login" onClick={this.props.components.transition}><span className="glyphicon glyphicon-log-in"></span> Sign In</a>
						}
					</div>
					<img src="/imgs/event_logo.png" alt="" height="60" /> 
					{/*
					<img src="/imgs/cubscout.gif" alt="" height="60" /> 
					<img src="/imgs/tigercub200.png" alt="" height="60" /> 
					<img src="/imgs/wolf200.png" alt="" height="60" /> 
					<img src="/imgs/bear200.png" alt="" height="60" /> 
					<img src="/imgs/webelos200.png" alt="" height="60" /> 
					<img src="/imgs/082_300.png" alt="" height="60" /> 

					<div className="navbar-right">
					<ul className="nav navbar-nav">
					<li><a href="#">Sign Up</a></li>
					<li><a href="#">Log In</a></li>
					</ul>
					</div>*/}
				</div>
			</nav>
		);
	};
}
export default Header;