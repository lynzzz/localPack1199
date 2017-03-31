import React, { Component } from 'react';
import './AdminHome.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/toastr.css';
import * as firebase from 'firebase';

class AdminHome extends Component {

	constructor(props) {
		super(props);

		this.state = {
			eventSummary: null,
			eventsArray: [],
		};
		
	}



	loadEvents = (userId)=> {
		firebase.database().ref('/users/' + userId + "/admin").once('value').then(				
				(snapshot)=>{
					let keys = Object.keys(snapshot.val());		
					keys.forEach((key)=>{

						firebase.database().ref('/eventSummary/' + key).once('value').then(
							(eventSummary)=>{
								let tempArray = this.state.eventsArray;
								tempArray.push({
										id: key,
										title: eventSummary.val().title,	
									});
								this.setState({
									eventSummary: Object.assign({}, 
										this.state.eventSummary, 
										{[key]: eventSummary.val()}),
									eventsArray: tempArray,	
								});
							});
					});			
				}
			);		
	}

	cellButton = (cell, row, enumObject, rowIndex)=> {
		if (this.state.eventSummary==null) {
			return (<div />)
		}
		else {
			let event = this.state.eventSummary[row.id];

			return (
				<div className="row">
	    			<div className="col-md-6 event-title">
						<a href="#" 
							onClick={()=>this.props.components.transitionUrl("/admin/" + event.uri + "/participant")}
							>{cell}</a>
					</div>
					<div className="col-md-6">
						<button className="btn btn-primary" data-toggle="tooltip" title="Participants"
							type="button" 
							onClick={()=>this.props.components.transitionUrl("/admin/" + event.uri + "/participant")}
							>
							<span className="fa fa-users fa-lg"></span>
						</button>
						<span>    </span>
						<button className="btn btn-primary" data-toggle="tooltip" title="Tasks"
							type="button" 
							onClick={()=>this.props.components.transitionUrl("/admin/" + event.uri + "/task")}
							>
							<span className="fa fa-tasks fa-lg"></span>
						</button>
						<span>    </span>
						<button className="btn btn-primary" data-toggle="tooltip" title="Payments"
							type="button" 
							onClick={()=>this.props.components.transitionUrl("/admin/" + event.uri + "/payment")}
							>
							<span className="fa fa-usd fa-lg"></span>
						</button>
					</div>
				</div>
				)
		}
		
	}

	componentWillMount() {
		this.loadEvents(this.props.components.userId);			
	}

	render() {
		return (
			<div className="container" >
				<div className="form-group">
					<div className="col-md-12">
						<BootstrapTable data={this.state.eventsArray} striped={true} hover={true} >
							<TableHeaderColumn hidden={true} dataField="id" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
							<TableHeaderColumn dataField="title" dataAlign="center" dataSort={true} dataFormat={this.cellButton}>Events</TableHeaderColumn>
						</BootstrapTable>
					</div>
				</div>
			</div>
		);
	};
}
export default AdminHome;