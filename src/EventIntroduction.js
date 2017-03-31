import React, { Component } from 'react';
import './EventIntroduction.css';
import GoogleMapLoader from './GoogleMapLoader';
import * as firebase from 'firebase';

class EventIntroduction extends Component {

	constructor(props) {
		super(props);
		this.state = {
			infor: {
				title: "",
				starts: {
					date: "",
					time: "",
				},
				ends: {
					date: "",
					time: "",
				},
				images: {
					IMG_1: "",
					IMG_2: "",
				},
				location: {
					address: "",
					address2: "",
					city: "",
					state: "",
					zip: "",
				}
			}
		}; 
		
	}




	componentWillMount() {		
		firebase.database().ref('/events/E_1/infor').once('value').then(
				(snapshot)=>{
					this.setState({infor: snapshot.val()})
				});
	}

	componentDidMount() {
		// new google.maps.Map(this.refs.map, {
		// 	center: {lat: -34.397, lng: 150.644},
		// });
		// let s = document.createElement('script');
  //       s.type = 'text/javascript';
  //       s.async = true;
  //       s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCc7aHAvkAf52ywAfpcpJpX9ZiEAPBlGpQ&callback=initMap';
  //       this.instance.appendChild(s);
  //       s = document.createElement('script');
  //       s.type = 'text/javascript';
  //       s.src = "/js/Map.js";
  //       // s.innerHTML = 'function initMap() {      var tops = {lat: 39.3147293, lng: -77.3843508};     ' +  
  //       // 'var map = new google.maps.Map(document.getElementById(\'maps\'), {        zoom: 17,        center: tops      });}';
		// this.instance.appendChild(s);
      
	}

	render() {
		
		let infor = this.state.infor;


		return (
			
		<div className="container col-md-10">
			<div className="navigation-link">
				 <a href="/" onClick={this.props.components.transition} >Home</a>&nbsp;&#187;&nbsp;
				 <a href="#" onClick={this.props.components.transition} >2017 Spring Family Overnight</a> 
			</div>
			<div className="text-center title">
				<img src={"/imgs/" + infor.images.IMG_1} alt="" /> 
				<h1 >{infor.title}</h1>
				<h3 >{infor.starts.date} {infor.starts.time} - {infor.ends.date} {infor.ends.time}</h3>
			</div>
		

			<div className="confirm">
				<button className="btn btn-danger join" onClick={()=>this.props.components.transitionUrl("/" + this.props.components.eventUri + "/participant")}>
					JOIN
				</button>
			</div>

			<div className="page-layout">
				<div className="primary">
					{/*eventInfo.description*/}
					<div>
						<br />
						<strong>
							<p>All adults are expected to assist in making this event a success.  The Pack puts this on and we need all your help in holding our own overnight.</p>					
							<p>Reservations and payments must be made by April 24.  Fee is non-refundable after April 24.
								Health forms must be handed in by April 24th and are required of all attendees (adults and youth)
							</p>
							<p>For more information, contact <a href="mailto:doug_fletcher1@yahoo.com"> Doug Fletcher </a></p>
						</strong>
					</div>

					<div>
						<h3><span className="label label-primary">Activities</span></h3>
						<div>Fishing, Nature Hike, Sports and Games, Playground, Geocaching, Giant Slides, Camp Fire, STEM Lesson, Challenge course, Opportunities for awards, and much more!</div>
						<p><strong>Meals included</strong>: Saturday coffee/juice, Saturday lunch, Saturday dinner, Saturday night snack, Sunday continental breakfast.</p>					
						<p><strong>Sleeping Arrangements</strong>: Bring your own tent (or borrow one from a friend), Sleep in the Mountainside Yurts ($5 per person). Yurts are equipped with cots and mattresses.</p>
						<p><strong>What to bring</strong>: sleeping bag, pillow, sleeping pad (tent campers only), 2 changes of clothing, rain gear, toiletries, flash light, fishing pole (optional), Geocaching app/ device (optional), extra shoes/boots and socks.</p>

						<h3><span className="label label-primary">Price</span></h3>
						<ul className="default-list">
							<li>$30 per Scout or Scout age sibling (K-4th grade)</li>
							<li>$15 per Adult</li>
							<li>$5 per yurt sleeper (optional)</li>
						</ul>	
					</div>				
					
					<div>
						<h3><span className="label label-primary">Tentative Schedule</span></h3>
							<div className="row">
								<div className="col-md-10 schedule">
									<strong className="list-intro">Saturday</strong>					
									<ul className="default-list">
										<li>10:00 registration/check-in open</li>
										<li>10:45 opening ceremony</li>
										<li>11:00 activities open</li>
										<li>12:00-1:00 lunch </li>
										<li>1:00 -5:00 activities open</li>
										<li>5:30-7:00 Dinner</li>
										<li>7:30-8:30 campfire/snacks</li>
										<li>10:00 quiet hours</li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col-md-10 schedule">
									<strong className="list-intro">Sunday</strong>					
									<ul className="default-list">
										<li>8:00-9:30 breakfast</li>
										<li>10:00 closing ceremony and cleanup</li>
										<li>11:00 departure.</li>
									</ul>
								</div>
							</div>
					</div>

					<div >
						<h3><span className="label label-primary">Location</span></h3>
						<div className="row">
							<div id="map-outer" className="col-md-12">
								<div id="address" className="col-md-4">
									
									<address>
										<strong>Address</strong><br />
										{infor.location.address}<br />
										{infor.location.address2}<br />
										{infor.location.city}<br />
										{infor.location.state}<br />
										{infor.location.zip}
									</address>
								</div>
								{/*<div id="map-container" className="col-md-8">
									<div ref="map" >
										<div ref={(el) => (this.instance = el)} /> 
									</div>
									<div id="maps" style={{height: 300}}>this is a map</div>
								</div>*/}
								<div id="address" className="col-md-8">
									<GoogleMapLoader />
								</div>
							</div>
						</div>
					</div> 	
				</div>
			</div>
		</div>
		);
	};
}
export default EventIntroduction;

