import React, { Component } from 'react';
import CommentList from './CommentList';
import * as firebase from 'firebase';
import './Comments.css';

class Comments extends Component{

	constructor(props) {
		super(props);
		//this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			comments: [],
			keys: {},
			user: this.props.components.user
		};

		this.createComment = this.createComment.bind(this);
		
	}


	componentWillMount() {		
		this.loadComments();

	}

	loadComments = () =>{
		var commentArray = [];
		var self = this;
		var query = firebase.database().ref('/events/E_1/comments').orderByKey();
		query.once('value')
			.then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					var key = childSnapshot.key;
					var childData = childSnapshot.val();
					childData.key = key;
					// console.log('childData: '+ JSON.stringify(childData, null, 3));
					commentArray.push(childData);
					// console.log('commentArray length: '+ commentArray.length);
					var obj = self.assign(commentArray);
					self.setState({
						comments: commentArray,
						keys:obj
					});
					
				});
			});
		var query2 = firebase.database().ref('/events/E_1/comments');
		query2.on('child_added', snap => {});
	}

	loadReplies = (commentKey) =>{
		
		var replyArray = [];
		
		var query = firebase.database().ref('/events/E_1/comments/' + commentKey + '/replies').orderByKey();
		query.once('value')
			.then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					var key = childSnapshot.key;
					var childData = childSnapshot.val();
					childData.key = key;
					// console.log('childData: '+ JSON.stringify(childData, null, 3));
					replyArray.push(childData);
					// console.log('Reply Array length: '+ replyArray.length);
					//var obj = self.assign(commentArray)
				});
			});
		var query2 = firebase.database().ref('/events/E_1/comments/' + commentKey + '/replies');
		query2.on('child_added', snap => {});
		return replyArray;
	}

	addReply = (commentKey) =>{
		var stateObj = this.state.keys;
		var replyArray = [];
		var query = firebase.database().ref('/events/E_1/comments/' + commentKey + '/replies');
		query.on('child_added', snap => {
			var key=snap.key;
			var childData = snap.val();
			childData.key = key;
			replyArray.push(childData);
		});
		stateObj[commentKey]['replies']=replyArray;
		this.setState({
			keys: stateObj
		});
		
	}

	addComment = () =>{
		var commentArray = [];
		var query = firebase.database().ref('/events/E_1/comments');
		query.on('child_added', snap => {
			var key=snap.key;
			var childData = snap.val();
			childData.key = key;
			commentArray.push(childData);
		});
		this.setState({
			comments: commentArray
		});
		this.setState({
			keys: this.assign(commentArray)
		});
	}

	assign = (commentArray) => {
		var obj={};
		var lastKeyIndex = commentArray.length;
		// console.log('comment length: ' + lastKeyIndex);
		for(var i=0; i < lastKeyIndex; i++){
			obj[commentArray[i].key] = {};
			obj[commentArray[i].key]['showReplyForm'] = false;
			obj[commentArray[i].key]['showReplyButton'] = true;
			obj[commentArray[i].key]['showExpandList'] = false;
			obj[commentArray[i].key]['showExpandButton'] = true;
			obj[commentArray[i].key]['replies'] = this.loadReplies(commentArray[i].key);
		}
		// var str = JSON.stringify(obj, null, 3);
		// console.log('Initial load: ' + str);
		return obj;
		
	}



	showReplyFormStatus =(keyValue) => {

		var stateObj = this.state.keys;
		stateObj[keyValue]['showReplyForm'] = !stateObj[keyValue]['showReplyForm'];
		stateObj[keyValue]['showReplyButton'] = !stateObj[keyValue]['showReplyButton'];
		//stateObj[keyValue]['showExpandButton'] = !stateObj[keyValue]['showExpandButton'];
		this.setState({
			keys: stateObj
		});
	}

	showReplyListStatus =(keyValue) => {

		var stateObj = this.state.keys;
		if(stateObj[keyValue]['showExpandButton'])
		{
			this.addReply(keyValue);
		}
		stateObj[keyValue]['showExpandList'] = !stateObj[keyValue]['showExpandList'];
		stateObj[keyValue]['showExpandButton'] = !stateObj[keyValue]['showExpandButton'];
		this.setState({
			keys: stateObj
		});
	}

	submitReplyStatus =(keyValue) => {
		var stateObj = this.state.keys;
		this.addReply(keyValue);
		stateObj[keyValue]['showExpandButton'] = false;
		stateObj[keyValue]['showExpandList'] = true;
		stateObj[keyValue]['showReplyForm'] = false;
		stateObj[keyValue]['showReplyButton'] = true;
		this.setState({
			keys: stateObj
		});
	}

	createComment = (e) => {
		e.preventDefault();
		var fullName = this.state.user.firstName + " " + this.state.user.lastName;
		const content = this.input2.value;
		this.writeComment(fullName, content);
		this.input2.value ="";
		this.addComment();
  	}

  	writeComment = (author, content) => {
  		var commentListRef = firebase.database().ref('/events/E_1/comments');
  		commentListRef.push({
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
		let message = "";
		if (this.props.components.user != null) {
			message = "Comments & Questions";
		}
		
		return (
			<div className="comment-container">
				<div className="row">
					<div className="col-sm-11 col-md-9 ">			        
						<form className="form-addComment" onSubmit={this.createComment}>
							<h3>{message}</h3>
							<p> Comments and questions about this event and our website are appreciated and can be submitted using the form below.</p>
							<textarea id="comment" type="text" className="form-control" placeholder="Add your comment here" ref={(a) => this.input2 =a} required />
							<button className="btn btn-sm btn-primary btn-submit" type="submit">
								Submit
							</button>
							<br />
						</form>
					</div>
					<div className="col-sm-11 col-md-9 ">
					
					<CommentList user={this.state.user} entries={this.state.comments} keyEntries={this.state.keys} submitReply={this.submitReplyStatus} showForm={this.showReplyFormStatus} showReList={this.showReplyListStatus} />
					
					</div>
				</div>
			</div>
		);
	};

}

export default Comments;