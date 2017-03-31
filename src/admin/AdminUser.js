import React, { Component } from 'react';
import './AdminUser.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/toastr.css';
import * as firebase from 'firebase';

class AdminUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			usersArray: [{
				id: "",
				name: "",
				email: "",
				phone: "",		
			}],
		};
		
	}

	json2array = (json)=>{
		var result = [];
		var keys = Object.keys(json);
		keys.forEach((key)=>{
			let user = json[key];
			result.push({
				id: key,
				name: user.firstName + " " + user.lastName,
				email: user.email,
				phone: user.phone,
				
			});
		});
		return result;
	}

	loadUsers = ()=> {
		firebase.database().ref('/users').once('value').then(
				(snapshot)=>{
					this.setState({
							usersArray: this.json2array(snapshot.val())
					});				
				}
			);
		
	}

	componentWillMount() {
		this.loadUsers();
	}

	render() {
	
		return (
			<div className="container" >
				<h2><span className="label label-primary" >Users</span></h2>
				<div className="form-group">
					<div className="col-md-12">
						<BootstrapTable data={this.state.usersArray} striped={true} hover={true}  pagination exportCSV>
							<TableHeaderColumn hidden={true} dataField="id" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
							<TableHeaderColumn width="150" dataField="name" dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
							<TableHeaderColumn width="150" dataField="email" dataAlign="center" dataSort={true}>Email</TableHeaderColumn>
							<TableHeaderColumn width="200" dataField="phone" dataAlign="center" dataSort={true}>Phone</TableHeaderColumn>
						</BootstrapTable>
					</div>
				</div>
			</div>
		);
	};
}
export default AdminUser;
