import React from 'react';
import Modal  from 'react-modal';
import * as firebase from 'firebase';



class HealthFormModal extends React.Component{
    constructor(props){
		super(props)
		this.state = {
			isModalOpen : false
		}
	}


    openModal(){
	    if (  this.props.selectedArray.length == 0 ){
		    alert("Please select at least one participant");
			return;
		}
		this.setState({isModalOpen : true})
	}

	closeModal(){
		this.setState({isModalOpen : false})
	}

    /*save(){
	    firebase.database().ref('/events/' + eventId + "/participants" + this.props.selectedArray[0]).set({
		        name: "KKKKKKKKK",
				age: 15,
				den: "",
				yurt: "",
				paid: "",
				healthForm: "",
				}
		)
	}
	*/




    render(){
	
	const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-30%, -30%)'
  }
};


		return(
			<div>
                <button className="btn btn-warning" onClick={()=>this.openModal()}>Edit Participant</button>
                <Modal isOpen={this.state.isModalOpen} contentLabel="Health Form Modal" style = {customStyles}>
               
			        <div className="modal-header">
					    Health Form option
					</div>
			   
					 <div className="modal-header">
					 <div  className="dropdown">						
                        <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Health Form
                        <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                        <li><a href="#">Yes</a></li>
                        <li><a href="#">No</a></li>
                        </ul>
                    </div>
					</div>

					<div className="modal-footer">
					    <button className="btn btn-primary" onClick={()=>this.save() }>save</button>
					    <button className="btn btn-primary" onClick={()=>this.closeModal()}>cancel</button>
					</div>
				</Modal>
			</div>
		);
	};

}

export default HealthFormModal;
