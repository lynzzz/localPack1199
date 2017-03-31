import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ParticipantComponent from './ParticipantComponent';
import './Participant.css';
import axios from 'axios';
import * as firebase from 'firebase';


class Participant extends Component {
	constructor(props) {
		super(props);

		this.state = {
			participantInfo: null,
			email: this.props.components.user.email,
			phone: this.props.components.user.phone,
		};
	}
	
	componentWillMount(){
		this.loadParticipants(this.props.components.user.id);
		this.loadUserPhone(this.props.components.user.id);

	}

	onClear = ()=> {
		this.setState({participantInfo:null});
		this.loadParticipants(this.props.components.user.id);
	}

	loadUserPhone = (userId)=> {
		firebase.database().ref('/users/' + userId + '/phone').once('value').then((snapshot)=> {
			this.setState({phone: snapshot.val()});
		});
	}

	loadParticipants = (userId)=> {
		let newObj = null;
		firebase.database().ref('/events/E_1/participants').orderByChild("user")
			.equalTo(userId).on("child_added", (data)=> {
				let key = data.key;
				newObj = Object.assign({}, newObj, {[key]: data.val()});		
				this.setState({participantInfo:newObj});				
			});
		
	}

	addParticipant = ()=> {
		let userId = this.props.components.user.id;
		let date = new Date();
		let key = userId + "_" + date.getTime();
		let data = {
			age: "",
			den: "",
			firstName: "",
			lastName: "",
			healthForm: false,
			paid: false,
			tasks: null,
			user: userId,
			yurt: false,
		};
		let newObj = Object.assign({}, this.state.participantInfo, {[key]: data});
		this.setState({participantInfo:newObj});
	}

	onDelete = (key)=>{
		let newObj = Object.assign({}, this.state.participantInfo);
		newObj[key] = null;
		this.setState({participantInfo:newObj});

	}


	onChange = (name, value, key)=> {
		let ParticipantInfo = Object.assign({}, this.state.participantInfo);

		// var ParticipantInfo = this.state.participantInfo;
		// console.log("name:" + name + " value:" + value + " key:" + key);
		ParticipantInfo[key][name] = value;
		this.setState({
            participantInfo: ParticipantInfo
			})
		// console.log(this.state.participantInfo);
	}



    componentDidUpdate(nextProps, nextState) {
    	return true;
	}

	onSave = (event)=> {
		event.preventDefault();
		var updates = {};
		let partInf = this.state.participantInfo;
		// console.log(partInf);
		// eslint-disable-next-line
    	for (let key in partInf) {    		
    			updates['/events/E_1/participants/' + key] = partInf[key];		
    	}
		
		updates['/users/'+this.props.components.user.id+'/phone'] = this.state.phone;
		firebase.database().ref().update(updates, ()=> {
			this.props.components.transitionUrl("/" + this.props.components.eventUri + "/pay");
		});

		axios.get('https://www.letstops.com/updatePack1199/index.php')
			.then(function (response) {
			// console.log(response);
			})
			.catch(function (error) {
			console.log(error);
			});
	}

 	onPhoneChange = ()=> {
 		this.setState({phone: ReactDOM.findDOMNode(this.refs.phone0).value + 
 			"-" + ReactDOM.findDOMNode(this.refs.phone1).value +
 			"-" + ReactDOM.findDOMNode(this.refs.phone2).value
 		});
 	}

	render() {
    	var ParticipantApp = [];
    	let partInf = this.state.participantInfo;

    	for (let key in partInf) {
    		if (partInf[key]!=null) {
    			let components = {
					participant: partInf[key],
					onChange: this.onChange,
					onDelete: this.onDelete,
					key: key,
					paid: partInf[key]["paid"],
				};
	    		ParticipantApp.push(
	            	<ParticipantComponent components={components} /> 
				);
    		}
    		
			// <br />
    	}

		let phone = this.state.phone.split("-");
		return (
			<div className="container" >
				<div className="navigation-link" >
					<a href="/" onClick={this.props.components.transition} >Home</a>&nbsp;&#187;&nbsp;
					<a href="/2017_spring_family_overnight" onClick={this.props.components.transition} >2017 Spring Family Overnight</a>&nbsp;&#187;&nbsp;
					<a href="#" onClick={this.props.components.transition} >Participant</a>
				</div>
				<div className="body">
					<form className="form-horizontal" onSubmit={this.onSave}>
						<fieldset className="fieldset col-md-10">
							<legend className="legend">Contact Information</legend>
							<div className="form-group">
								<label className="control-label col-sm-2">Email</label>
								<div className="col-md-3">
									<input type="text" value={this.state.email} onChange={this.onChange} disabled/>
								</div>
								<label className="control-label col-sm-2">Phone</label>
								<div className="col-md-5 phone">
									(<input type="text" ref="phone0" value={phone[0]} onChange={this.onPhoneChange} />) -
										<input type="text" value={phone[1]} ref="phone1" onChange={this.onPhoneChange} />-
										<input type="text" value={phone[2]} ref="phone2" onChange={this.onPhoneChange}/>
								</div>
							</div>		
						</fieldset>
						{ParticipantApp.map((component) => {return component})}
						<div className="form-group button-group">
							<div className="col-md-7">						
							</div>
							<div className="col-md-5">							
								<button className="btn btn-primary" type="button" onClick={this.addParticipant}>Add Participant</button>
								<button className="btn btn-primary" type="submit" >Save</button>	
								<button className="btn btn-primary" type="button" onClick={this.onClear}>Clear</button>			
							</div>
						</div>						
					</form>
				</div>
			</div>
		);
	};
}
export default Participant;