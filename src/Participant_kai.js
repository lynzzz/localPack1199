import React, { Component } from 'react';
import ParticipantComponent from './ParticipantComponent';
import './Participant.css';
import * as firebase from 'firebase';
import Modal from './Modal';

class Participant extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errorShow: false,
			participantInfo: null,
			participantIdentifier: null,
			email: this.props.components.user.email,
			phone: this.props.components.user.phone,
		};
	}
	
	componentWillMount(){
		this.loadParticipants(this.props.components.user.id);		
	}

	loadParticipants = (userId)=> {	  	
			let newObj = null;		  		
			firebase.database().ref('/events/E_1/participants').orderByChild("user")
				.equalTo(userId).on("child_added", 
					(data)=> {		 
						let key = data.key;		 
						newObj = Object.assign({}, newObj, {[key]: data.val()});
						this.setState({participantInfo:newObj});
					});
		}
	// loadParticipants = (userId)=> {
	// 	let newObj = null;
	// 	let count = 0; //sequence of participant
	// 	let paticipantID = {};
	// 	firebase.database().ref('/events/E_1/participants/').once("value", (data)=> {
	// 		for(var P in data.val()){
	// 			if (data.val()[P]['user'] === userId){
	// 				//console.log(P, data.val()[P]);
	// 				paticipantID = Object.assign({}, paticipantID, {[count]: P});
	// 				// console.log("ID",paticipantID);
	// 				var tempObj = {};
	// 				for(var key1 in data.val()[P]){
	// 					//console.log("key1", key1, data.val()[key1] )
	// 					if (key1 === 'firstName'){
	// 						key1 = 0;
	// 						tempObj = Object.assign({}, tempObj, {[key1]: data.val()[P]['firstName']});
	// 						newObj = Object.assign({}, newObj, {[count]: tempObj});
	// 					}
	// 					else if (key1 === 'lastName')	{
	// 						key1 = 1;
	// 						tempObj = Object.assign({}, tempObj, {[key1]: data.val()[P]['lastName']});
	// 						newObj = Object.assign({}, newObj, {[count]: tempObj});
	// 					}
	// 					else if (key1 ==='age')	{
	// 						key1 = 2;
	// 						tempObj = Object.assign({}, tempObj, {[key1]: data.val()[P]['age']});
	// 						newObj = Object.assign({}, newObj, {[count]: tempObj});
	// 					}
	// 					else if (key1 === 'den')	{
	// 						key1 = 3;
	// 						tempObj = Object.assign({}, tempObj, {[key1]: data.val()[P]['den']});
	// 						newObj = Object.assign({}, newObj, {[count]: tempObj});
	// 					}
	// 					else if (key1 === 'yurt')	{
	// 						key1 = 4;
	// 						tempObj = Object.assign({}, tempObj, {[key1]: data.val()[P]['yurt']});
	// 						newObj = Object.assign({}, newObj, {[count]: tempObj});
	// 					}
	// 				}
	// 				count++;
	// 				this.setState({
	// 					participantInfo:newObj,
	// 					participantIdentifier:paticipantID
	// 				})
	// 			}
	// 			;
	// 		}
	// 		});
		
	// }

	handlePhoneChange = (e) =>{
		let phone = this.state.phone.split("-");
		if(e.target.id === 0){
			phone[0] = e.target.value;
		}
		else if(e.target.id === 1){
			phone[1] = e.target.value;
		}
		else if(e.target.id === 2){
			phone[2] = e.target.value;
		}
		phone = phone.join("-");
		let newObj = Object.assign({}, this.state, {phone : phone});
		this.setState(newObj);
	}

	handlePaticipantOnFormChange = (name, value, key)=> {
		var ParticipantInfo = this.state.participantInfo;
		var field = null;//FirstName, LastName, Age, Den
		if(name==="FirstName"){
			field = 0;
		}
		else if(name==="LastName"){
			field = 1;
		}
		else if(name==="Age"){
			field = 2;
		}
		else if(name==="Den"){
			field = 3;
		}
		else if(name==="Yurt"){
			field = 4;
		}
		else{
			console.log("No such field");
		};
		ParticipantInfo[key][field] = value;
		// console.log(ParticipantInfo);
		this.setState({
            participantInfo: ParticipantInfo
		})
	}

	handleDelete = (key)=>{
		// console.log(key);
		var participantLength = Object.keys(this.state.participantInfo).length;
        var participantInfo =  this.state.participantInfo;
		// console.log(participantInfo);
        delete participantInfo[key];
		if (key !== (participantLength - 1)){
			for(var count=key; count<participantLength-1; count++){
				participantInfo[count] = participantInfo[count+1];
			}
			delete participantInfo[participantLength-1];
		}
		// console.log(participantInfo);
        this.setState({
            participantInfo: participantInfo
		});
	}

	handleAdd = () =>{
		let participantInfo = Object.assign({}, this.state.participantInfo);
        participantInfo[Object.keys(participantInfo).length] = {
			0:"",
			1:"",
			2:"",
			3:"",
			4:false
		};
        this.setState({
            participantInfo: participantInfo
        });
	}
	
	handleClose=()=>{
		this.setState({
			errorShow: false
		});
	}

    handleSave = (event) =>{
		event.preventDefault();
		var that = this;
		var participantToBeChecked = this.state.participantInfo;
		var fieldAllFilled = null;
		
		for (var P in participantToBeChecked){//check all fields are filled
			if (participantToBeChecked[P]!=null) {
				var breakflag = 0;
				//console.log("hi123",participantToBeChecked[P]);
				for (var field in participantToBeChecked[P]){
					//console.log(field, " ",participantToBeChecked[P][field]);
					if (field === 4) continue;
					if(!(participantToBeChecked[P][field])){
						breakflag = 1; 
						break;
					}
				}
				if (breakflag === 1){
					fieldAllFilled = false;
					break;
				}
				fieldAllFilled = true;
			}			
		}
		//console.log("filled", fieldAllFilled);
		if (fieldAllFilled){
			firebase.auth().onAuthStateChanged((user)=> {
            if (user!=null) {
                // console.log("signed in");
				var maxParticipantId = 0;
				var numberOfParticipants = 0;
				const eventSummaryRef = firebase.database().ref('/eventSummary/E_1');
				eventSummaryRef.child('maxParticipantId').once("value").then(function(snap) {
					maxParticipantId = snap.val();
					//console.log("maxID",maxParticipantId);
					eventSummaryRef.child('/numberOfParticipants').once("value", function(snap) {
						numberOfParticipants = snap.val();
						// console.log("numberOfParticipants",numberOfParticipants);
						
						var previousNoOfPaticipants = null;
						if(that.state.participantIdentifier == null){
							previousNoOfPaticipants = 0
						}
						else{
							previousNoOfPaticipants = Object.keys(that.state.participantIdentifier).length;
						}

						var currentNoOfPaticipants = null;
						if(that.state.participantInfo == null){
							currentNoOfPaticipants = 0
						}
						else{
							currentNoOfPaticipants = Object.keys(that.state.participantInfo).length;
						}
						// console.log(previousNoOfPaticipants, currentNoOfPaticipants);

						// console.log("previous", previousNoOfPaticipants);
						// console.log("current", currentNoOfPaticipants);
						var newIdentifierObject = Object.assign({}, that.state.participantIdentifier);
						// console.log("new1", newIdentifierObject);
						var NoofAddedPaticipant = currentNoOfPaticipants - previousNoOfPaticipants;
						// console.log('NoofAddedPaticipant', NoofAddedPaticipant);
						
						if (NoofAddedPaticipant < 0) {//delete user
							// console.log("delete user");
							numberOfParticipants = parseInt(numberOfParticipants, 10) + NoofAddedPaticipant;
							//console.log(numberOfParticipants);
							NoofAddedPaticipant = previousNoOfPaticipants - currentNoOfPaticipants;
							for(let count = 0; count < NoofAddedPaticipant; count++){
								delete newIdentifierObject[Object.keys(newIdentifierObject).length-1];
							}
							eventSummaryRef.child('numberOfParticipants').set(numberOfParticipants);
						}
						else if(NoofAddedPaticipant===0){
							//newIdentifierObject
							// console.log("No modification on user");
						}
						else{//add user
							// console.log("add user");
							for(let temp = maxParticipantId + 1, count =0; count < NoofAddedPaticipant; count++){
								var ID = "P_" + (temp + count);
								newIdentifierObject[Object.keys(newIdentifierObject).length] = ID;		
							}
							numberOfParticipants = parseInt(numberOfParticipants, 10) + NoofAddedPaticipant;
							maxParticipantId += NoofAddedPaticipant;
							eventSummaryRef.child('numberOfParticipants').set(numberOfParticipants);
							eventSummaryRef.child('maxParticipantId').set(maxParticipantId);
						}
						// console.log("new2", newIdentifierObject);
						const participantRef = firebase.database().ref('/events/E_1/participants');
						const dbusersRef = firebase.database().ref('/users');
						numberOfParticipants = parseInt(numberOfParticipants, 10);
						
						//save phone
						//this.props.components.user.id
						dbusersRef.child(that.props.components.user.id).child('phone').set(that.state.phone);
						
						//console.log(that.state.participantIdentifier);
						var ParticipantToBeDeleted = that.state.participantIdentifier;
						// console.log("ParticipantToBeDeleted ",ParticipantToBeDeleted);
						for(var key in ParticipantToBeDeleted){
							if (ParticipantToBeDeleted[key]!=null) {
								participantRef.child(ParticipantToBeDeleted[key]).remove();
							}							
						}//delete old participant info
						
						//newIdentifierObject
						
						dbusersRef.once("value").then(function(snapshot) {
							snapshot.forEach(function(childSnapshot) {
								var UID = childSnapshot.key;
								var val = childSnapshot.val();
								// console.log(UID, val);
								if (val["email"] === that.state.email){
									//newIdentifierObject
									// console.log("here");
									for(var key in newIdentifierObject){
										if (newIdentifierObject[key]!=null) {
											var temp = {
												firstName: that.state.participantInfo[key][0],
												lastName: that.state.participantInfo[key][1],
												age: that.state.participantInfo[key][2],
												den: that.state.participantInfo[key][3],
												healthForm: false,
												paid: false,
												tasks: {
													TK_1: true,
													TK_2: true
												},
												user: UID,
												yurt: that.state.participantInfo[key][4]
											};
											participantRef.update({[newIdentifierObject[key]]:temp});
										}										
									};
								}
							});
							that.loadParticipants(that.props.components.user.id);
						});
					});
				});
				}
			});
		}
		else{
			that.setState({
				errorShow: true
			})
		}
		
        
    }
	
	componentDidUpdate(){
		//console.log("ref",this.refs['P0']);
	}

	render() {
    	// var NoOfParticipant = this.state.NoOfParticipant;
    	var ParticipantApp = [];
    	let partInf = this.state.participantInfo;
    	// console.log(this.state);
    	let count = 0;
    	for (let key in partInf) {
    		if (!partInf.hasOwnProperty(key)) continue;
    		let components = {
				participant: partInf[key],
				ID: count,
				onParticipantFormChange: this.onParticipantFormChange,
				PaticipantOnFormChange: this.handlePaticipantOnFormChange,
				deleteParticipant: this.handleDelete,
				key: key,
			};
    		ParticipantApp.push(
            	<ParticipantComponent components={components} key={count}/>
			);

			count++;
    	}
		count = 0;
		var ParticipantAppRefWrapper = React.Children.map(ParticipantApp, function(child){
			// console.log(child);
			return React.cloneElement(child, {
                ref: 'P' + (count++)
            });
		});
		var modal = null;//error message
		if (!this.state.errorShow){
			modal = null;
		}
		else{
			modal = (
				<Modal onclose={this.handleClose}>
					<h2>Please fill out red part befoe save</h2>
				</Modal>
			)
		}
		
		let phone = this.state.phone.split("-");
		return (
			<div className="container" >
				<fieldset className="fieldset col-md-10">
					<legend className="legend">Contact Information</legend>
					<div className="body">
						<form className="form-horizontal" >
							<div className="form-group">
								<label className="control-label col-sm-2">Email</label>
								<div className="col-md-3">
									<input type="text" value={this.state.email} disabled/>
								</div>
								<label className="control-label col-sm-2">Phone</label>
								<div className="col-md-5 phone">
									(<input type="text" id="0" value={phone[0]} onChange={this.handlePhoneChange}/>) -<input type="text" id="1" value={phone[1]} onChange={this.handlePhoneChange}/>-<input type="text" id="2" value={phone[2]} onChange={this.handlePhoneChange}/>
								</div>
							</div>								
						</form>
					</div>
				</fieldset>
				{modal}
				{ParticipantAppRefWrapper}
				
				<div className="form-group button-group">
					<div className="col-md-7">
						
					</div>
					<div className="col-md-5">
						<button className="btn btn-primary" type="button" onClick={()=>{this.loadParticipants(this.props.components.user.id)}}>Load Exisiting Info</button>
						<button className="btn btn-primary" type="button" onClick={this.handleAdd}>Add Paticipant</button>
						<button className="btn btn-primary" type="button" onClick={this.handleSave}>Submit</button>
					</div>
				</div>
			</div>
		);
	};
}
export default Participant;