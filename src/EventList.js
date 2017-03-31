import React, { Component } from 'react';
import EventSummary from './EventSummary'
import * as firebase from 'firebase';
import './EventList.css';

class EventList extends Component {

	constructor(props) {
		super(props);
		this.state = {E_1: {
			transition: null,
			eventUri: this.props.components.eventUri,
		}}; 
		
	}

	componentWillMount() {		
		firebase.database().ref('/eventSummary/E_1').once('value').then(
			(event)=>{
				let tempEvent = event.val();
				tempEvent.transitionUrl = this.props.components.transitionUrl;
				tempEvent.eventUri = this.props.components.eventUri;
				this.setState({
					E_1: tempEvent
				})
			}
		);
	}
	

	render() {
	
		return (
			<div className="container" >
			
   				<EventSummary components={this.state.E_1} />			
			
			</div>
		);
	};
}
export default EventList;