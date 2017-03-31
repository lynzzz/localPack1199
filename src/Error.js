import React, { Component } from 'react';
import './Error.css';

class Error extends Component {

	render() {

	
		return (
			<div className="container" >
				<div className="col-sm-3" />
				<div className="col-sm-6">
					<div className="col-sm-12 thumbnail text-center">
						<img alt="" className="img-responsive" src="./imgs/oops.jpg" />
						<div className="caption">
							<h4>Oops, this page doesn't exist.</h4>
						</div>
					</div>
				</div>   
				<div className="col-sm-3" />      
			</div>
		);
	};
}
export default Error;