import React, { Component } from 'react';
import './Login.css';
import * as firebase from 'firebase';



class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {"email": "",
			"password":""
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	updateState(e) {
      this.setState({[e.target.id]: e.target.value});
   }

	onSubmit(e){
		// console.log('submit');
		e.preventDefault();
		
		this.props.components.onSignIn(this.state.email, this.state.password, this.props.components.url);		
	    
	}

	sendPwdEmail(e) {
		var email = prompt("Please enter your email to recover your password", "");
		if(email != null){
				var auth = firebase.auth();
				auth.sendPasswordResetEmail(email).then(
					() => alert("An email has been sent to the address you entered. Please follow the instructions to reset your password."),
					function(error){
						var errorMessage = error.message;
				        alert(errorMessage);
				      	console.log(error);
				});
		}
	}

	render() {
		
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6 col-md-4 col-md-offset-4">			        
						<form className="form-signin" onSubmit={this.onSubmit}>
							<h3><span className="label label-primary">Email</span></h3>
							<input id="email" type="text" className="form-control" onChange={this.updateState} required autoFocus />
							<br />
							<h3><span className="label label-primary">Password</span></h3>
							<input id="password" type="password" className="form-control" onChange={this.updateState} required />
							<br />
							<button className="btn btn-lg btn-primary btn-block" type="submit">
								Sign in
							</button>
							<br />
							<div className="signup">
								<a href="/signup" onClick={this.props.components.transition}><span className="glyphicon glyphicon-plus-sign"></span> Create Account</a>
							</div>
							<div>
								<p id="pwdreset" >Forgot your password? Click <a href="#" onClick={this.sendPwdEmail}>here</a>.</p>
							</div>
						</form>						
					</div>
				</div>
			</div>
		);
	}
}


export default Login;