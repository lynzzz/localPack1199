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

  save(){
      var index = document.getElementById("healthFrom").selectedIndex;
      var selectFrom = false;

      if ( index == 0){
          alert("Please select a value")
          return;
      }else if ( index == 1){
          selectFrom = true;
      }else{
          selectFrom = false;
      }

      var time = new Date();
      console.log(time);

      for( var i=0; i<this.props.selectedArray.length; i++ ){
          var ref =  firebase.database().ref('/events/' + this.props.eventid + "/participants/" +this.props.selectedArray[i] );
          ref.update(
            {
              "healthForm" : selectFrom
            }
          )
      }

      this.closeModal();
	}


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
					    Health Form Selection
					</div>

					 <div className="modal-header">
                   <label>Health Form:</label>
                   <select id="healthFrom">
                       <option value="N/A">--- Please select ---</option>
                       <option value="Yes">Yes</option>
                       <option value="No">No</option>
                   </select>
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
