import React, { Component } from 'react';
import './EventSummary.css';


// const history = createHistory(); 
class EventSummary extends Component {

	render() {
		let event = this.props.components;
	
		return (
			<div className="event-summary">
				<div>
	   				<div><img src={"/imgs/" + event.icon} alt="" height="180" /></div>
	   				<strong>{event.title}</strong>
	   				<p>Registration deadline: </p>
	   				<p>{event.terminateDate} </p>
	   				<button className="btn btn-default" onClick={()=>event.transitionUrl("/" + event.eventUri + "/introduction")}>
	   					DETAIL
	   				</button>
	   				<button className="btn btn-default" onClick={()=>event.transitionUrl("/" + event.eventUri + "/participant")}>
	   					JOIN
	   				</button>
				</div>
			</div>
		);
	};
}
export default EventSummary;