import React from 'react';
import ReactModal  from 'react-modal';



class HealthFormModal extends React.Component{
    constructor(props){
		super(props)
		this.state = {
			isModalOpen : false
		}
	}


    openModal(){
	    if (  this.props.numberOfSelectedRow == 0 ){
		    alert("Please select at least one participant");
			return;
		}
		this.setState({isModalOpen : true})
	}

	closeModal(){
		this.setState({isModalOpen : false})
	}
         

	
	
    render(){	
	
		return(
			<div>
                <button className="btn btn-warning" onClick={()=>this.openModal()}>Edit Participant</button>
                <ReactModal 
				     isOpen={this.state.isModalOpen} 
					 contentLabel="Health Form Modal"
                     style={{ overlay: {    
	
	position          : 'fixed',
    top                        : '300px',
    left                       : '300px',
	width                      :  '25%',
	height                     :  '50%'//,
    //backgroundColor   : 'rgba(255, 255, 255, 0.75)'
	}, 
	
	content: {
	 
	position                   : 'absolute',
    
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'} }}
				>
				    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Health Form
                        <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                        <li><a href="#">Yes</a></li>
                        <li><a href="#">NO</a></li>
                        </ul>
                    </div>
					
					<button onClick={()=>this.closeModal()}>close</button>
				</ReactModal>
			</div>
		);
	};

}

export default HealthFormModal;
