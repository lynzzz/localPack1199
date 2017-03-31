import React, { Component } from 'react';
import * as firebase from 'firebase';

class ReplyForm extends Component {

createReply= (e) => {
		e.preventDefault();
		const author = this.props.user.firstName + " " + this.props.user.lastName;
		const content = this.input2.value;
		this.writeReply(author, content, this.props.commentKey);
		this.input2.value ="";
		this.props.submitReply(this.props.commentKey);

  	}

  
writeReply = (author, content, key) => {
  		var replyListRef = firebase.database().ref('/events/E_1/comments/'+key+'/replies');
  		replyListRef.push({
  			author: author,
  			content: content,
  			date: this.getCurrentDate()
  		});
  	}

  	getCurrentDate = () => {
  		var today = new Date();
  		var dd = today.getDate();
  		var mm = today.getMonth() +1;
  		var yyyy = today.getFullYear();

  		if(dd<10) { dd = '0' + dd}

  		if(mm<10) { mm = '0' + mm}

  		today = mm + '/' + dd +'/' + yyyy;

  	    return today;
	}


	render() {
		
		return (
			<form className="form-addComment" onSubmit={this.createReply}>
			
				<textarea id="comment" type="text" className="form-control" placeholder="Add your reply here" ref={(a) => this.input2 =a} required />
				<button className="btn btn-sm btn-primary btn-submit" type="submit">
					Submit
				</button>

				<br />
			</form>
		);
	}
}
export default ReplyForm;