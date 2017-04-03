import React, { Component } from 'react';
import './AdminParticipant.css';
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/toastr.css';
import * as firebase from 'firebase';



class AdminParticipant extends Component {

	constructor(props) {
		super(props);

		this.state = {
			totalNum: 0,
			eventTitle: "Participants",
			participantsArray: [{
				id: "",
				name: "",
				age: "",
				den: "",
				yurt: "",
				paid: "",
				healthForm: "",
			}],
		};
		
	}

	json2array(json){
		var result = [];
		var keys = Object.keys(json);
		let totalNum = 0;
		keys.forEach((key)=>{
			let participant = json[key];
			totalNum++;
			result.push({
				id: key,
				name: participant.firstName + " " + participant.lastName,
				age: participant.age,
				den: participant.den,
				yurt: participant.yurt ? "Yes" : "No",
				paid: participant.paid ? "Yes" : "No",
				healthForm: participant.healthForm ? "Yes" : "No",
			});
		});
		this.setState({totalNum: totalNum});
		return result;
	}

	loadParticipants = (eventId)=> {
		firebase.database().ref('/events/' + eventId + "/participants").once('value').then(
				(snapshot)=>{
					this.setState({
							participantsArray: this.json2array(snapshot.val())
					});					
				}
			);
	}


	componentWillMount() {
		this.loadParticipants(this.props.components.eventId);
	}

    createCustomButtonGroup = props => {
    return (
      <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
	  { props.exportCSVBtn }
		 <button type='button' className= 'btn btn-warning'>
         EditTable
         </button>
      </ButtonGroup>
    );
   }

	render() {
	
		const selectRowProp = {
        mode: 'checkbox',
        bgColor: 'pink'
        };
		
		const options = {
            btnGroup: this.createCustomButtonGroup
		}
	
		return (
			<div className="container" >
				<h2><span className="label label-primary" >{this.state.eventTitle}</span></h2>
				<p>Number of participants: {this.state.totalNum}</p>
				<div className="form-group">
		    		<div className="col-md-12">
				        <BootstrapTable data={this.state.participantsArray} selectRow = {selectRowProp} striped={true} hover={true} pagination exportCSV options={ options }>
				          <TableHeaderColumn hidden={true} dataField="id" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
					      <TableHeaderColumn width="200" dataField="name" dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
					      <TableHeaderColumn width="100" dataField="age" dataAlign="center" dataSort={true}>Age</TableHeaderColumn>
					      <TableHeaderColumn width="100" dataField="den" dataAlign="center" dataSort={true}>Den</TableHeaderColumn>
					      <TableHeaderColumn width="100" dataField="yurt" dataAlign="center" dataSort={true}>Yurt</TableHeaderColumn>
					      <TableHeaderColumn width="100" dataField="paid" dataAlign="center" dataSort={true}>Paid</TableHeaderColumn>
					      <TableHeaderColumn width="100" dataField="healthForm" dataAlign="center" dataSort={true}>Health Form</TableHeaderColumn>
					      {/*<TableHeaderColumn dataField="operate" dataFormat={this.cellButton.bind(this)} ></TableHeaderColumn>*/}
						</BootstrapTable>
					</div>
			    </div>
			</div>
		);
	};
}
export default AdminParticipant;
