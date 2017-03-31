import React, { Component } from 'react';
import './AdminPayment.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/toastr.css';
import * as firebase from 'firebase';

class AdminPayment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: null,
			paymentsArray: [{
				id: "",
				user: "",
				amount: "",
				date: "",		
				note: "",		
			}],
		};
		
	}

	json2array = (json)=>{
		var result = [];
		var keys = Object.keys(json);
		keys.forEach((key)=>{
			let payment = json[key];
			let users = this.state.users;
			result.push({
				id: key,
				user: users[payment.user_id].firstName + " " + users[payment.user_id].lastName,
				amount: payment.amount,
				date: payment.created_at,
				note: payment.note,
				
			});
		});
		return result;
	}

	loadParticipants = (eventId)=> {
		firebase.database().ref('/users').once('value').then(
				(snapshot)=>{
					this.setState({
							users: snapshot.val()
					});		
					firebase.database().ref('/events/' + eventId + "/payments").once('value').then(
					(snapshot)=>{
						this.setState({
								paymentsArray: this.json2array(snapshot.val())
						});					
					}
				);			
				}
			);
		
	}

	componentWillMount() {
		this.loadParticipants(this.props.components.eventId);
	}

	render() {
	
		return (
			<div className="container" >
				<h2><span className="label label-primary" >Payments</span></h2>
				<div className="form-group">
					<div className="col-md-12">
						<BootstrapTable data={this.state.paymentsArray} striped={true} hover={true} pagination exportCSV>
							<TableHeaderColumn hidden={true} dataField="id" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
							<TableHeaderColumn width="150" dataField="user" dataAlign="center" dataSort={true}>Creator</TableHeaderColumn>
							<TableHeaderColumn width="150" dataField="amount" dataAlign="center" dataSort={true}>Amount ($)</TableHeaderColumn>
							<TableHeaderColumn width="200" dataField="date" dataAlign="center" dataSort={true}>Date</TableHeaderColumn>
							<TableHeaderColumn width="400" dataField="note" dataAlign="center" dataSort={true}>Note</TableHeaderColumn>
						{/*<TableHeaderColumn dataField="operate" dataFormat={this.cellButton.bind(this)} ></TableHeaderColumn>*/}
						</BootstrapTable>
					</div>
				</div>
			</div>
		);
	};
}
export default AdminPayment;