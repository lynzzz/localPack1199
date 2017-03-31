import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './ParticipantComponent.css';
import * as firebase from 'firebase';

class ParticipantComponent extends Component {
	constructor(props){
		super(props);
		
        var ID = this.props.components.ID;
		var AgeOption = [{
			"value" : "A_0",
			"label"  : ""
		}];
		var DenOption = [{
			"value" : "A_0",
			"label"  : ""
		}];

		this.state = {
			ID: ID,
			options: {
				AgeOption: AgeOption,
				DenOption: DenOption
			},
		};
	}

	iniAgeAndDenSelect = (optionsAge, optionsDen)=> {
		let newAge = [{ "value": null, "label": "" }];
		let newDen = [{ "value": null, "label": "" }];
		for (var key1 in optionsAge) {
			if (!optionsAge.hasOwnProperty(key1)) continue;
			newAge.push({value: key1, label: optionsAge[key1] });
		}
		for (var key2 in optionsDen) {
			if (!optionsDen.hasOwnProperty(key2)) continue;
			newDen.push({value: key2, label: optionsDen[key2] });
		}
		let newAgeOptions = Object.assign({}, this.state.AgeOption, {
			AgeOption: newAge
		})
		let newDenOptions = Object.assign({}, this.state.DenOption, {
			DenOption: newDen
		})
		let newState = Object.assign({}, this.state, {
			options:  {
				AgeOption: newAgeOptions,
				DenOption: newDenOptions
		}});
		this.setState(newState);
	}

	onAgeChange = (obj)=> {
		this.props.components.PaticipantOnFormChange("Age", obj.value, this.state.ID);
	}
	
	onDenChange = (obj)=> {
		this.props.components.PaticipantOnFormChange("Den", obj.value, this.state.ID);
	}
	
	onFirstNameChange = (event)=> {
		this.props.components.PaticipantOnFormChange("FirstName", event.target.value, this.state.ID);
	}
	
	onLastNameChange = (event)=> {
		this.props.components.PaticipantOnFormChange("LastName", event.target.value, this.state.ID);
	}
	
	onYurtChange = (event)=> {
		//console.log(event);
		this.props.components.PaticipantOnFormChange("Yurt", event.target.checked, this.state.ID);
	}

    onFormDelete = (event)=> {
		event.preventDefault();
		this.props.components.deleteParticipant(this.state.ID);
	}

    componentWillMount() {
		firebase.database().ref('/events/E_1/options').once('value').then(
			(client)=>{
				this.iniAgeAndDenSelect(client.val().age, client.val().Den);					
			}
		);
	}

	render() {
    	var ID =this.props.components.ID + 1;
    	let participant = this.props.components.participant;
		//console.log("firstname",participant[0]);
    	
		var firstNameLabel,lastNameLabel, ageLabel, denLabel = null;
		
		if (participant[0]){//filled = true; unfilled = false;
			firstNameLabel = <label className="control-label col-sm-2">First Name</label>;
		}
		else{
			firstNameLabel = <label className="control-label col-sm-2 unfilled">First Name</label>;
		}
		
		if (participant[1]){//filled = true; unfilled = false;
			lastNameLabel = <label className="control-label col-sm-2">Last Name</label>;
		}
		else{
			lastNameLabel = <label className="control-label col-sm-2 unfilled">Last Name</label>;
		}

		if (participant[2]){//filled = true; unfilled = false;
			ageLabel = <label className="control-label col-sm-2">Age</label>;
		}
		else{
			ageLabel = <label className="control-label col-sm-2 unfilled">Age</label>;
		}

		if (participant[3]){//filled = true; unfilled = false;
			denLabel = <label className="control-label col-sm-2">Den</label>;
		}
		else{
			denLabel = <label className="control-label col-sm-2 unfilled">Den</label>;
		}		

		return (
				<div>
					<fieldset className="fieldset col-md-10">
						<legend className="legend">Paticipant {ID}</legend>
						<div className="body">
							<form className="form-horizontal" >
								<div className="form-group">
									{firstNameLabel}
									<div className="col-md-4">
										<input type="text" name="FirstName" value={participant[0]} onChange={this.onFirstNameChange}/>
									</div>
									{lastNameLabel}
									<div className="col-md-4">
										<input type="text" name="LastName" value={participant[1]} onChange={this.onLastNameChange}/>
									</div>
								</div>		
								<div className="form-group">
									{ageLabel}
									<div className="col-md-4">
										<Select
										    id="age"
										    value={participant[2]}
										    options={this.state.options.AgeOption.AgeOption}
										    onChange={this.onAgeChange}
										    clearable={false}
										/>
									</div>
									{denLabel}
									<div className="col-md-4">
										<Select 
											id="Den"
											value={participant[3]}
											options={this.state.options.DenOption.DenOption}
											onChange={this.onDenChange}
											clearable={false}
											className="participant-select"
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-sm-2">Yurt</label>
									<div className="col-md-4">
										<input type="checkbox"  name="Yurt" checked={participant[4]} onChange={this.onYurtChange}/>
									</div>
									<div className="control-label col-sm-2">
									</div>
									<div className="col-md-4">
										<button className="btn btn-danger" onClick={this.onFormDelete}>Delete</button>
									</div>
								</div>						
							</form>
						</div>
					</fieldset>
				</div>
		);
	};
}
export default ParticipantComponent;