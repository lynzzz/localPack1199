import React, { Component } from 'react';
import './Signup.css';


class Signup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPwd: ""

		};

	}

	updateState = (e) => {
      this.setState({[e.target.id]: e.target.value});
   }

	createAccount = (e) => {
		e.preventDefault();
		if (this.state.password===this.state.confirmPwd) {			
			this.props.components.onSignUp(this.state);
		}
		else {
			this.setState({password: "", confirmPwd: ""});
			alert("The passwords do not match.");
		}		
  	}

	
render() {
		
		return (
			<div className="container">	        
				<form className="form-signup" onSubmit={this.createAccount}>
					<div className="row">
						<label className="control-label col-md-4">First Name</label>
						<div className="col-md-8">
							<input id="firstName" type="text" className="form-control" onChange={this.updateState} value={this.state.firstName} required autoFocus/>
						</div>
					</div>
					<div className="row">
						<label className="control-label col-md-4">Last Name</label>
						<div className="col-md-8">
							<input id="lastName" type="text" className="form-control" onChange={this.updateState} value={this.state.lastName} required />
						</div>
					</div>
					<div className="row">
						<label className="control-label col-md-4">Email</label>
						<div className="col-md-8">
							<input id="email" type="text" className="form-control" onChange={this.updateState} value={this.state.email} required />
						</div>
					</div>
					<div className="row">
						<label className="control-label col-md-4">Password</label>
						<div className="col-md-8">
							<input id="password" type="password" className="form-control" onChange={this.updateState} value={this.state.password} aria-describedby="passwordHelpBlock" required />
							<p id="passwordHelpBlock" className="form-text text-muted">
								Your password must be at least 6 characters long.
							</p>
						</div>
					</div>						
					<div className="row">
						<label className="control-label col-md-4">Reenter Password</label>
						<div className="col-md-8">
							<input id="confirmPwd" type="password" className="form-control" onChange={this.updateState} value={this.state.confirmPwd} required />
						</div>
					</div>	
					<div className="row">
						<div className="col-md-4"> </div>
						<div className="col-md-4">
						<button className="btn btn-lg btn-primary btn-block" type="submit" >
							Sign up
						</button>
						</div>
						<div className="col-md-4"> </div>
					</div>
				</form>
			</div>
		);
	}


}

export default Signup;