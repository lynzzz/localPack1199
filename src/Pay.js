import React, { Component } from 'react';
import './Pay.css';
import * as firebase from 'firebase';
// import Spinner from 'react-spin';

class Pay extends Component {

	constructor(props) {
		super(props);
		this.state = {
			unpaidParticipantIdArray: null,
			adultNumber : 0,
			youthNumber: 0,
			yurtNumber :0,
			adultPrice: 15,
			youthPrice: 30,
			yurtPrice: 5,
			payMethod: "creditCard",
		}; 
		
	}

	getPaymentSummary = ()=> {
		let unpaidParticipantIdArray = [];	
		let adultNumber = 0;
		let youthNumber = 0;
		let yurtNumber = 0;		
		let userId = this.props.components.user.id;
		firebase.database().ref('/events/E_1/participants').orderByChild("user")
			.equalTo(userId).on("child_added", (snapshot)=> {
				// console.log(snapshot.val()['paid']);
				if (snapshot.val()['paid']) {
				}
				else {
					// console.log(snapshot.getKey());
					// console.log(snapshot.val());
					unpaidParticipantIdArray.push(snapshot.getKey());
					if (snapshot.val()['age']==='Adult'){
						adultNumber++;
					}
					else if (snapshot.val()['age']==='Youth') {
						youthNumber++;
					}
					if (snapshot.val()['yurt']){
						yurtNumber++;
					}
					// if (key===Object.keys(participants)[Object.keys(participants).length-1]) {
						this.setState({
							unpaidParticipantIdArray: unpaidParticipantIdArray, 
							adultNumber: adultNumber,
							youthNumber: youthNumber,
							yurtNumber: yurtNumber,
						});
					// }
					console.log(yurtNumber);
				}					
			});		
	} 

	// listen the payment status of the first unpaid participant
	listenPaymentStatus = (unpaidParticipantIdArray)=> {
		let participantId = unpaidParticipantIdArray[0];
		var paymentRef = firebase.database().ref('events/E_1/participants/' + participantId + '/paid');
		
		paymentRef.on('value', (snapshot) => {
		  if(snapshot.val()!==false) {
		  	this.props.components.transitionUrl("/" + this.props.components.eventUri + "/confirm");
		  }
		});	
	}

	getParticipantString = (unpaidparticipantIdArray)=> {
		let participants = "";
		for (let id in unpaidparticipantIdArray) {
			if (unpaidparticipantIdArray[id]!=null) {
				participants += "P-" + unpaidparticipantIdArray[id];
			}
			
		}
		return participants;
	}

	redirectToParticipant = () => {
		this.props.components.transitionUrl("/" + this.props.components.eventUri + "/participant");
	}

	redirectToConfirmation = () => {
		let amount = this.state.adultNumber*this.state.adultPrice + 
			this.state.youthNumber*this.state.youthPrice + 
			this.state.yurtNumber*this.state.yurtPrice;
		this.props.components.transitionUrl("/" + this.props.components.eventUri + "/confirm?amount=" + amount);
	}

	onPayMethodChange = (event)=> {
		this.setState({payMethod: event.target.value});
	}


	componentWillMount() {
		this.getPaymentSummary();
		
	}
	

	render() {
		let components = this.props.components;
		let userId = components.user.id;			
		let eventId = components.eventId;
		let unpaidParticipantIdArray = this.state.unpaidParticipantIdArray;
		let sumPrice = this.state.adultNumber*this.state.adultPrice+this.state.youthPrice*this.state.youthNumber+this.state.yurtPrice*this.state.yurtNumber;
		
		let payMethod = 
			<form className="payMethod">
				<div className="radio">
					<label>
						<input type="radio" name="payMethod" value="creditCard" 
							checked={this.state.payMethod==='creditCard'} 
							onChange={this.onPayMethodChange}/>
						Pay with Credit Card
					</label>
				</div>
				<div className="radio">
					<label>
						<input type="radio" name="payMethod" value="check" 
							checked={this.state.payMethod==='check'} 
							onChange={this.onPayMethodChange}/>
						Pay with Check
					</label>
				</div>
			</form>;
		// <br />
		let feeRatio = this.state.payMethod==='creditCard' ? 0.029 : 0;
		let feeAdditional = ((this.state.payMethod==='creditCard') && (sumPrice>0)) ? 0.3 : 0;
		let fee = (sumPrice + feeAdditional)/(1-feeRatio)-sumPrice;
		let totalPrice = sumPrice + fee;
		let summary = 
			<div className="table-responsive">
				<table className="table table-striped">
					<tr>
						<th>Ticket</th>
						<th>Quantity</th>
						<th>Price ($)</th>
					</tr>
					<tr>
						<td>Adult</td>
						<td>{this.state.adultNumber}</td>
						<td>{this.state.adultNumber*this.state.adultPrice}</td>
					</tr>
					<tr>
						<td>Youth</td>
						<td>{this.state.youthNumber}</td>
						<td>{this.state.youthPrice*this.state.youthNumber}</td>
					</tr>
					<tr>
						<td>Yurt</td>
						<td>{this.state.yurtNumber}</td>
						<td>{this.state.yurtPrice*this.state.yurtNumber}</td>
					</tr>
					<tr >
						<td></td>
						<td ></td>
						<td className="processingFee">Processing Fee: {fee.toFixed(2)}</td>
					</tr>
					<tr >
						<td></td>
						<td ></td>
						<td className="totalPrice">Total Price: {totalPrice.toFixed(2)}</td>
					</tr>
				</table>
			</div>;

		let creditCardInfo;
		if (totalPrice>0) {
			let participantString = this.getParticipantString(unpaidParticipantIdArray);			
			this.listenPaymentStatus(unpaidParticipantIdArray);
			let paySrc = "https://www.letstops.com/square/?participants=" + participantString + "&userId=" + 
				userId + "&eventId=" + eventId + "&firstName=" + components.user.firstName + "&lastName=" + 
				components.user.lastName + "&amount=" + totalPrice.toFixed(2);
			creditCardInfo = 
				<div>
					<iframe src={paySrc} height="300px" scrolling="no">
					  <p>Your browser does not support iframes.</p>
					</iframe>
				</div>;
			// <br />
		}

		let checkInfo = 
			<div className="checkInfo">
				<p>Please send the check to:</p>
				<p>Susan Owens</p>
				<p>21104 Chrisman Hill Court</p>
				<p>Boyds, MD 20841</p>
				<p>Or</p>
				<p>Kevin Qi</p>
				<p>18850 Broken Oak Rd</p>
				<p>Boyds, MD 20841</p>
				<br />
				<p>Or submit the check at a pack meeting</p>
				<button className="btn btn-primary" onClick={()=>components.transitionUrl("/" + components.eventUri + "/confirm")}>
   					Continue
   				</button>
			</div>;

		let payInfo = this.state.payMethod==='creditCard' ? creditCardInfo : checkInfo;

		return (
			<div className="pay-block cintainer">
				<div className="navigation-link">
					<a href="/" onClick={this.props.components.transition}  >Home</a>&nbsp;&#187;&nbsp;
					<a href="/2017_spring_family_overnight" onClick={this.props.components.transition} >2017 Spring Family Overnight</a>&nbsp;&#187;&nbsp;
					<a href="/2017_spring_family_overnight/participant" onClick={this.props.components.transition} >Participant</a>&nbsp;&#187;&nbsp;
					<a href="#" onClick={this.props.components.transition} >Pay</a>
				</div>
				{payMethod}
				{summary}
				{payInfo}
				{/*<Spinner />*/}				
			</div>
		);
		
	};
}
export default Pay;