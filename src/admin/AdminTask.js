import React, { Component } from 'react';
import './AdminTask.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/toastr.css';
import * as firebase from 'firebase';

class AdminTask extends Component {

	constructor(props) {
		super(props);

		this.state = {
			participants: null,
			tasksArray: [{
				id: "",
				title: "",
				require: "",
				volunteers: "",				
			}],
		};
		
	}

	searchParticipants = (taskId)=> {
		let participants = this.state.participants;
		return Object.keys(participants).reduce(
				(previous, key)=>{					
					return previous + 
					((participants[key].task===taskId) ? participants[key].firstName + " " + participants[key].lastName + "; <br />" : "");
				}, ""
			);
	}

	json2array = (json)=>{
		var result = [];
		var keys = Object.keys(json);
		keys.forEach((key)=>{
			let task = json[key];
			let volunteers = this.searchParticipants(key);
			result.push({
				id: key,
				title: task.title,
				volunteers: volunteers,
				require: volunteers.split(";").length-1 + "/" + task.require,
				
			});
		});
		return result;
	}

	loadParticipants = (eventId)=> {
		firebase.database().ref('/events/' + eventId + "/participants").once('value').then(
				(snapshot)=>{
					this.setState({
							participants: snapshot.val()
					});		
					firebase.database().ref('/events/' + eventId + "/tasks").once('value').then(
					(snapshot)=>{
						this.setState({
								tasksArray: this.json2array(snapshot.val())
						});					
					}
				);			
				}
			);
		
	}

	multilineCell(cell, row) {
    return cell ;
} 


	componentWillMount() {
		this.loadParticipants(this.props.components.eventId);
	}

	render() {
	
		return (
			<div className="container" >
				<h2><span className="label label-primary" >Tasks</span></h2>
				<div className="form-group">
					<div className="col-md-12">
						<BootstrapTable data={this.state.tasksArray} striped={true} hover={true} exportCSV>
							<TableHeaderColumn hidden={true} dataField="id" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
							<TableHeaderColumn width="300" dataField="title" dataAlign="center" dataSort={true}>Task</TableHeaderColumn>
							<TableHeaderColumn width="150" dataField="require" dataAlign="center" dataSort={true}>Filled/Need</TableHeaderColumn>
							<TableHeaderColumn width="500" dataField="volunteers" dataAlign="center" dataSort={true} dataFormat={this.multilineCell}>Volunteer</TableHeaderColumn>
						{/*<TableHeaderColumn dataField="operate" dataFormat={this.cellButton.bind(this)} ></TableHeaderColumn>*/}
						</BootstrapTable>
					</div>
				</div>
			</div>
		);
	};
}
export default AdminTask;