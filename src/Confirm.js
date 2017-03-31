import React, { Component } from 'react';
import './Confirm.css';

class Confirm extends Component {

	render() {
	
		return (
			<div className="container" >
   				<div className="navigation-link" >
					<a href="/" onClick={this.props.components.transition} >Home</a>&nbsp;&#187;&nbsp;
					<a href="/2017_spring_family_overnight" onClick={this.props.components.transition} >2017 Spring Family Overnight</a>&nbsp;&#187;&nbsp;
					<a href="/2017_spring_family_overnight/participant" onClick={this.props.components.transition} >Participant</a>&nbsp;&#187;&nbsp;
					<a href="/2017_spring_family_overnight/pay" onClick={this.props.components.transition} >Pay</a>&nbsp;&#187;&nbsp;
					<a href="#" onClick={this.props.components.transition} >Confirmation</a>
				</div>
				

				<div className="page-layout">
					<div className="primary">
						<div>
							<h3><span className="label label-primary">BSA health forms</span></h3>
							<p>Download the form <a href="/pdf/680-001_ABC.pdf" download >here</a></p>
							<p>We will need part A and B of the BSA health forms for each participant (adults, scouts, and siblings). 
								If you have filled one out for another trip this year, those should be fine (they have to be dated within 12 months of the event)</p>							
						</div>				
						<div>
							<h3><span className="label label-primary">Mountainside participant agreement</span></h3>
							<p>Download the form <a href="/pdf/Participant Agreement 2017.pdf" download >here</a></p>
							<p>New for this year, we will also need ONE Mountainside participant agreement form filled out FOR EACH FAMILY.</p>							
						</div>				
					</div>
				</div>
				<br />
				<br />

				<div className="address">
					<p>Please send the forms to:</p>
					<p>Susan Owens</p>
					<p>21104 Chrisman Hill Court</p>
					<p>Boyds, MD 20841</p>
					<p>Or</p>
					<p>Kevin Qi</p>
					<p>18850 Broken Oak Rd</p>
					<p>Boyds, MD 20841</p>
					<br />
					<p>Or submit the forms at a pack meeting</p>
				</div>
			</div>
		);
	};
}
export default Confirm;