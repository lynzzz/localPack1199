import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {

	updateModuleStatus = (location, user, eventUri, activeModule)=> {
		let moduleStatus = {
			home: "hide",
			signin:"hide",
			signout: "hide",
			introduction: "hide",
			comments: "hide",
			participant: "hide",
			pay: "hide",
			confirm: "hide",
			adminHome: "hide",
			adminParticipant: "hide",
			adminTask: "hide",
			adminUser: "hide",
			adminPayment: "hide",
		}
		if (user!=null) {
			moduleStatus.signout = "display";
		}
		else {
			moduleStatus.signin = "display";
		}

		let eventPathRegExp = new RegExp('^/' + eventUri);
		if (location.pathname.match(eventPathRegExp)!=null) {
			moduleStatus.introduction = "display";
			moduleStatus.comments = "display";
			if (user!=null) {
				moduleStatus.participant = "display";
				moduleStatus.pay = "display";
				moduleStatus.confirm = "display";
			}
		}

		if ((location.pathname.match(/^\/admin/)!=null)&&(user!=null)&&(user.admin!=null)) {			
			moduleStatus.adminHome = "display";		
			moduleStatus.adminUser = "display";
			let eventPathRegExp = new RegExp('^/admin/' + eventUri);
			if (location.pathname.match(eventPathRegExp)!=null) {
				moduleStatus.adminTask = "display";
				moduleStatus.adminParticipant = "display";
				moduleStatus.adminPayment = "display";
			}			
		}
		else {
			moduleStatus.home = "display";
		}

		moduleStatus[activeModule] = "active";
		return moduleStatus;
	}

	render() {
		let transition = this.props.components.transition;
		let eventUri = this.props.components.eventUri;
		let location = this.props.components.location;
		let user = this.props.components.user;
		let activeModule = this.props.components.activeModule;
		let moduleStatus = this.updateModuleStatus(location, user, eventUri, activeModule);
	
		return (
			<div className="menu-list">			  
				<ul id="menu-content" className="menu-content collapse out">
					<li className={moduleStatus.home} ><a href="/" onClick={transition}><span className="glyphicon glyphicon-home"></span> Home</a></li>
					<li className={moduleStatus.introduction}><a href={"/" + eventUri + "/introduction"} onClick={transition}><span className="fa fa-bullhorn"></span> Introduction</a></li>
					<li className={moduleStatus.participant}><a href={"/" + eventUri + "/participant"} onClick={transition}><span className="glyphicon glyphicon-user"></span> Participant</a></li>
					<li className={moduleStatus.pay}><a href={"/" + eventUri + "/pay"} onClick={transition}><span className="glyphicon glyphicon-usd"></span> Pay</a></li>
					<li className={moduleStatus.confirm}><a href={"/" + eventUri + "/confirm"} onClick={transition}><span className="glyphicon glyphicon-saved"></span> Confirmation</a></li>
					<li className={moduleStatus.comments}><a href={"/" + eventUri + "/comments"} onClick={transition}><span className="glyphicon glyphicon-comment"></span> Comment</a></li>
					<li className={moduleStatus.adminHome} ><a href="/admin" onClick={transition}><span className="glyphicon glyphicon-home"></span> Admin Home</a></li>
					<li className={moduleStatus.adminParticipant}><a href={"/admin/" + eventUri + "/participant"} onClick={transition}><span className="fa fa-users"></span> Participant</a></li>
					<li className={moduleStatus.adminTask}><a href={"/admin/" + eventUri + "/task"} onClick={transition}><span className="fa fa-tasks"></span> Task</a></li>
					<li className={moduleStatus.adminPayment}><a href={"/admin/" + eventUri + "/payment"} onClick={transition}><span className="fa fa-usd"></span> Payment</a></li>
					<li className={moduleStatus.adminUser}><a href={"/admin/user"} onClick={transition}><span className="fa fa-address-book"></span> User</a></li>
					{/*<li data-toggle={"collapse"} data-target="#admin" className={moduleStatus.adminParent}><a href="#"><span className="fa fa-cogs"></span> Administration <span className="arrow"></span></a></li>
					<ul className="sub-menu collapse" id="admin">
						<li className={moduleStatus.adminEvents}><a href="/adminEvents" onClick={transition}><span className="fa fa-angle-double-right"></span> <span className="fa fa-tasks"></span> Events</a></li>
						<li className={moduleStatus.adminUsers}><a href="/adminUsers" onClick={transition}><span className="fa fa-angle-double-right"></span> <span className="fa fa-users"></span> Users</a></li>
					</ul>*/}

					<li className={moduleStatus.signin}><a href="/login" onClick={transition}><span className="glyphicon glyphicon-log-in"></span> Sign in</a></li>
					<li className={moduleStatus.signout}><a href="/logout" onClick={transition}><span className="glyphicon glyphicon-log-out"></span> Sign Out</a></li>
				</ul>
			</div>	
		);
	};
}
export default Menu;