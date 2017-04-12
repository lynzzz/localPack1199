import React from 'react';

import createHistory from 'history/createBrowserHistory';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import Error from './Error';
import EventList from './EventList';
import EventIntroduction from './EventIntroduction';
import Participant from './Participant';
import Pay from './Pay';
import AdminTask from './admin/AdminTask';
import AdminHome from './admin/AdminHome';
import AdminPayment from './admin/AdminPayment';
import AdminParticipant from './admin/AdminParticipant';
import AdminUser from './admin/AdminUser';
import Confirm from './Confirm';
import Comments from './Comments';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import config from './Config';
import Menu from './Menu';
import * as firebase from 'firebase';

const history = createHistory();

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: null,
			activeModule: "home",
			user: null,
			eventUri: "2017_spring_family_overnight",
		};

	}


	getUserInfo = (userId)=>{
		firebase.database().ref('/users/' + userId).once('value').then((snapshot)=> {
			// console.log(userId);
			// console.log(snapshot.val());
			let tempObj = Object.assign({}, this.state);
			tempObj.user = 	{
				firstName: snapshot.val().firstName,
				lastName: snapshot.val().lastName,
				email: snapshot.val().email,
				phone: snapshot.val().phone,
				id: userId,
				admin: snapshot.val().admin,
			}
			this.setState(tempObj);

			// console.log("user info is", tempObj.user);
			// console.log(history.location.pathname);
			this.router(history.location);
		});
	}

	signInFirebase = (email, password, url) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				let userId = firebase.auth().currentUser.uid;
				this.getUserInfo(userId);

				// console.log("Signed in.");
				if (url==="/login")
					url = "/";
				this.transitionUrl(url);
			}, (error)=> {
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode === 'auth/wrong-password') {
					alert('Wrong password.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
			}
		);
	}

	signOutFirebase = ()=> {
    	firebase.auth().signOut().then(()=> {
      		this.setState({user: null});
      		this.transitionUrl("/");
      		// console.log("Signed out.");
    	}, (error)=> {
      		console.error('Sign Out Error', error);
    	});
  	}


    signUpFirebase = (newUser) => {
    	let email = newUser.email;
    	let password = newUser.password;
    	let confirmPwd = newUser.confirmPwd;
    	let firstName = newUser.firstName;
    	let lastName = newUser.lastName;
		if(password === confirmPwd){
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(
					()=>{
							this.writeUserData(firstName, lastName, email);
							this.transitionUrl("/")
						},
					function(error) {
						// Handle Errors here.
						// var errorCode = error.code;
						var errorMessage = error.message;
						alert(errorMessage);
					}
				);
			// firebase.auth().onAuthStateChanged((user)=>{
			// 	if(user){
			// 		this.writeUserData(firstName, lastName, email);
			// 		this.setState({user: {
			// 			firstName: firstName,
			// 			lastName: lastName,
			// 			email: email,
			// 			phone: "",
			// 			id: user.uid
			// 		}})
			// 	}
			// });
			return true;
		}
		else {
			return false;
		}
    }

    writeUserData = (firstName, lastName, email) => {
		var user = firebase.auth().currentUser;
		firebase.database().ref('users/' + user.uid).set({
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: ""
		});
	}


	router = (location) => {
		let page = null;
		let activeModule = null;
		let tempObj = Object.assign({}, this.state);
		let components = null;

		switch (location.pathname) {
			case "/":
				components = {
					transition: this.transition,
					transitionUrl: this.transitionUrl,
					eventUri: this.state.eventUri,
				};
				page = <EventList components={components}/>;
				activeModule = "home";
				break;
			case "/logout":
				page = <Logout onSignOut={this.signOutFirebase} appModule={this} />;
				activeModule = "logout";
				break;
			case "/" + this.state.eventUri:
			case "/" + this.state.eventUri + "/":
			case "/" + this.state.eventUri + "/introduction":
				components = {
					transition: this.transition,
					transitionUrl: this.transitionUrl,
					eventUri: this.state.eventUri,
				};
				page = <EventIntroduction components={components}/>;
				activeModule = "introduction";
				break;
			case "/" + this.state.eventUri + "/participant":
			case "/" + this.state.eventUri + "/pay":
			case "/" + this.state.eventUri + "/confirm":
			case "/" + this.state.eventUri + "/comments":
			case "/admin":
			case "/admin/user":
			case "/admin" + this.state.eventUri + "/participant":
			case "/admin" + this.state.eventUri + "/task":
			case "/login":
				components = {
					onSignIn: this.signInFirebase,
					url: location.pathname,
					transition: this.transition,
				};

				page = <Login components={components} />;
				activeModule ="login";
				break;
			case "/signup":
				components = {
					onSignUp: this.signUpFirebase
				};
				page = <Signup components={components} />;

				activeModule = "signup";
				break;
			default:
				page = <Error />;
				activeModule = "error";

			// case (location.pathname.match(/^\/one/) || {}).input:
			// 	page = <div>page one</div>;
			// 	break;
		}

		if (this.state.user!=null) {
			// eslint-disable-next-line
			switch (location.pathname) {
				case "/" + this.state.eventUri + "/participant":
					components = {
						transition: this.transition,
						transitionUrl: this.transitionUrl,
						user: this.state.user,
						eventUri: this.state.eventUri,
						getUserInfo: this.getUserInfo,
					};
					page = <Participant components={components}/>;
					activeModule = "participant";
					break;
				case "/" + this.state.eventUri + "/pay":
					components = {
						transition: this.transition,
						transitionUrl: this.transitionUrl,
						user: this.state.user,
						eventUri: this.state.eventUri,
						eventId: "E_1",
					};
					page = <Pay components={components}/>;
					activeModule = "pay";
					break;
				case "/" + this.state.eventUri + "/confirm":
					components = {
						transition: this.transition,
						transitionUrl: this.transitionUrl,
						user: this.state.user,
						eventUri: this.state.eventUri,
					};
					page = <Confirm components={components}/>;
					activeModule = "confirm";
					break;
				case "/" + this.state.eventUri + "/comments":
					components = {
						transition: this.transition,
						transitionUrl: this.transitionUrl,
						user: this.state.user,
						eventUri: this.state.eventUri,
					};
					page = <Comments components={components}/>;
					activeModule = "comments";
					break;
			}
		}

		if ((this.state.user!=null)&&(this.state.user.admin!=null)) {
			// eslint-disable-next-line
			switch (location.pathname) {
				case "/admin":
					components = {
						userId: this.state.user.id,
						transition: this.transition,
						transitionUrl: this.transitionUrl,
					};
					page = <AdminHome components={components} />
					activeModule = "adminHome";
					break;
				case "/admin/" + this.state.eventUri + "/participant":
					components = {
						eventId: "E_1",
						user: this.state.user,
					};
					page = <AdminParticipant components={components} />;
					activeModule = "adminParticipant";
					break;
				case "/admin/" + this.state.eventUri + "/payment":
					components = {
						eventId: "E_1",
					};
					page = <AdminPayment components={components} />;
					activeModule = "adminPayment";
					break;
				case "/admin/" + this.state.eventUri + "/task":
					components = {
						eventId: "E_1",
					};
					page = <AdminTask components={components}  />;
					activeModule = "adminTask";
					break;
				case "/admin/user":
					page = <AdminUser />;
					activeModule = "adminUser";
					break;
			}
		}

		tempObj.page = page;
		tempObj.activeModule = activeModule;
		this.setState(tempObj);
		// console.log(this.state.user);
	}

	transition = event => {
		event.preventDefault();
		history.push({
			pathname: event.currentTarget.pathname,
			search: event.currentTarget.search
		});
	};

	transitionUrl = (url) => {
		history.push({
			pathname: url
		});
	};


	componentWillMount() {
		var p = new Promise((resolve,reject) => resolve());
		p.then(firebase.initializeApp(config))
			.then(()=>console.log("Firebase initialized"))
			.catch(err=>console.log(err));

		firebase.auth().onAuthStateChanged((user)=> {
	      if (user!=null) {
	      	this.getUserInfo(user.uid);
	      }
	      else {
	      	console.log("not signed in");
	      	// this.signInFirebase("react@example.com", "react@example.com");
	      }
	    });

	    this.router(history.location);
		history.listen((location, action) => {
			// console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
			// console.log(`The last navigation action was ${action}`);
			this.router(location);
		});
	}

	componentDidMount() {

	}

	render() {
		let components = {
			transition: this.transition,
			user: this.state.user,
			eventUri: this.state.eventUri,
			location: history.location,
			activeModule: this.state.activeModule,
		};
		return (
			<div className="container-fluid container-main" >
				<Header components={components}/>
				<div className="row">
					<div >
						<div className="nav-side-menu">
							<div className="brand">Mountainside Cub Scout</div>
							<i className="glyphicon glyphicon-menu-hamburger toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
							<Menu components={components}/>
						</div>
					</div>
					<div >
						<div className="main" >
							<div>{this.state.page}</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}


export default App;
