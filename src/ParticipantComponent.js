import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './ParticipantComponent.css';
import * as firebase from 'firebase';

class ParticipantComponent extends Component {
	constructor(props){
		super(props);

		this.handleFormDelete = this.handleFormDelete.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

		this.state = {
			options: {
				ageOption: [
					{ value: "A_0", label: '' },					
				],
				denOption: [
					{ value: "D_0", label: '' },					
				],
				taskOption: [
					{ value: "TK_0", label: '' },					
				]
			},
		};
	}

	iniAgeSelect = (options)=> {
		let newAge = [{ value: null, label: '' }];
		for (var key in options) {
			if (!options.hasOwnProperty(key)) continue;
			newAge.push({value: key, label: options[key] });
		}
		let newOptions = Object.assign({}, this.state.options, {
			ageOption: newAge
		})
		let newState = Object.assign({}, this.state, {
			options: newOptions 
		});
		this.setState(newState);
	}

	iniDenSelect = (options)=> {
		let newDen = [{ value: null, label: '' }];
		for (var key in options) {
			if (!options.hasOwnProperty(key)) continue;
			newDen.push({value: key, label: options[key] });
		}
		let newOptions = Object.assign({}, this.state.options, {
			denOption: newDen
		})
		let newState = Object.assign({}, this.state, {
			options: newOptions 
		});
		this.setState(newState);
	}

	iniTaskSelect = (options)=> {
		let newTask = [{ value: null, label: '' }];
		for (var key in options) {
			if (!options.hasOwnProperty(key)) continue;
			let taskStatus = options[key]['full'] ? " (full)" : "";			
			newTask.push({value: key, label: options[key]['title'] + taskStatus, disabled: options[key]['full']});
		}
		let newOptions = Object.assign({}, this.state.options, {
			taskOption: newTask
		})
		let newState = Object.assign({}, this.state, {
			options: newOptions 
		});
		this.setState(newState);
	}

	onAgeChange = (obj)=> {
		this.props.components.onChange("age", obj.value, this.props.components.key);
	}

	onDenChange = (obj)=> {
		this.props.components.onChange("den", obj.value, this.props.components.key);
	}

	onTaskChange = (obj)=> {
		this.props.components.onChange("task", obj.value, this.props.components.key);
	}

    handleFormDelete(event){
		event.preventDefault();
		this.props.components.onDelete(this.props.components.key);
	}

    handleFormChange(event){

    	const target = event.target;
    	const name = target.name;
    	// let value = null;
    	// if (target.type==='checkbox') {
    	// 	value = target.checked;
    	// 	alert(value);
    	// }
    	// else {
    	// 	value = target.value;
    	// }
    	const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.components.onChange(name, value, this.props.components.key);

    }

    componentWillMount() {

		firebase.database().ref('/events/E_1/options').once('value').then(
			(snapshot)=>{						
				this.iniAgeSelect(snapshot.val().age);	
				this.iniDenSelect(snapshot.val().Den);								
			}
		);
		firebase.database().ref('/events/E_1/tasks').once('value').then(
			(snapshot)=>{						
				this.iniTaskSelect(snapshot.val());									
			}
		);
	}

	render() {
    	
    	let participant = this.props.components.participant;
    	let paid = this.props.components.paid;
    	let isDisabled = false;
    	let paidNotice = "";
    	if (paid) {
    		isDisabled = true;
    		paidNotice = "(paid)";
    	}
    	let isHidden = false;
    	if (participant.age !== 'Adult' ) {
    		isHidden = true;
    	}

		return (
				<div >
					<fieldset className="fieldset col-md-10">
						<legend className="legend">Participant {paidNotice}</legend>
						<div className="body">
							
								<div className="form-group">
									<label className="control-label col-sm-2">First Name</label>
									<div className="col-md-4">
										<input type="text" name="firstName" value={participant.firstName} onChange={this.handleFormChange} disabled={isDisabled} required/>
									</div>
									<label className="control-label col-sm-2">Last Name</label>
									<div className="col-md-4">
										<input type="text" name="lastName" value={participant.lastName} onChange={this.handleFormChange} disabled={isDisabled} required/>
									</div>
								</div>		
								<div className="form-group">
									<label className="control-label col-sm-2">Age</label>
									<div className="col-md-4">
										<Select
										    id="age"
										    required={true}
										    value={participant.age}
										    options={this.state.options.ageOption}
										    onChange={this.onAgeChange}
										    clearable={false}
										    disabled={isDisabled}
										/>
									</div>
									<label className="control-label col-sm-2">Den</label>
									<div className="col-md-4">
										<Select
										    id="den"
										    required={true}
										    value={participant.den}
										    options={this.state.options.denOption}
										    onChange={this.onDenChange}
										    clearable={false}
										    disabled={isDisabled}
										/>
									</div>
								</div>
								<div className="form-group">	
									<label className={"control-label col-sm-2 " + (isHidden ? 'hidden' : '')}>Volunteer</label>
									<div className={"col-md-4 " + (isHidden ? 'hidden' : '')}>
										<Select
										    id="task"		
										    required={!isHidden}								    
										    value={participant.task}
										    options={this.state.options.taskOption}
										    onChange={this.onTaskChange}
										    clearable={false}
										    disabled={isDisabled}
										/>
									</div>	
									<div className={"col-md-6 " + (isHidden ? '' : 'hidden')}>
									</div>
									<div className="control-label col-sm-2">
									</div>					
									<div className="col-md-2">
										<input type="checkbox"  name="yurt" checked={participant.yurt} onChange={this.handleFormChange} disabled={isDisabled}/>										
										<label className="checkboxLabel">Yurt</label>
									</div>

									<div className="col-md-2">
										<button className="btn btn-danger" onClick={this.handleFormDelete} disabled={isDisabled}>Delete</button>
									</div>
								</div>						

						</div>
					</fieldset>
				</div>
		);
	};
}
export default ParticipantComponent;