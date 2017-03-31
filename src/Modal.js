import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Modal extends Component {
	// constructor(props){
	// 	super(props);
	// }
	
	componentDidMount(){
		this.modalTarget = document.createElement('div');
		this.modalTarget.className = 'modal';
		document.body.appendChild(this.modalTarget);
		this._render();
	}
	
	componentWillUpdate(){
		this._render();
	}
	
	componentWillUnmount(){
		ReactDom.unmountComponentAtNode(this.modalTarget);
		document.body.removeChild(this.modalTarget);
	}
	
	close=()=>{
		this.props.onclose();
	}
	
	_render() {
		console.log("Modal rendering");
		ReactDom.render(
			(<div>{this.props.children}<button type="button" onClick={this.close}>close</button></div>), this.modalTarget
		);
	}
	
	render(){
		return (<div></div>)
	}
}

export default Modal;