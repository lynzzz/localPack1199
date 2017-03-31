import React, { Component } from 'react';
import ReplyForm from './ReplyForm';
import ReplyList from './ReplyList';
import './CommentList.css';

class CommentList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			keys: {},
			user: this.props.user
		}

	}

	shouldComponentUpdate(){
		return true;
	}

	showForm = (e) => {
		e.preventDefault();
		this.props.showForm(e.target.id);
		this.setState({
			keys: this.props.keyEntries
		});
	}

	showList = (e) => {
		e.preventDefault();
		this.props.showReList(e.target.id);
		this.setState({
			keys: this.props.keyEntries
		});
	}


	// clearReplies =() =>{
	// 	this.setState({
	// 		replies: []
	// 	});
	// }

	
	render() {
	var self = this;
	// console.log('entries length: ' + this.props.entries.length);

		var obj = this.props.keyEntries;
		
		// console.log(obj);
		var listItems = this.props.entries.map((item) => {
			    
				// console.log('showExpandList of:' + item.key + obj[item.key]['showExpandList']);
				return <li key={item.key} className="comment-list">

				<p className="text-comment">{item.content} </p>
				<span className="author-date">by {item.author} on {item.date}</span>
				<span className="btn-comment">
					<button className="btn btn-sm btn-default" id={item.key} onClick={self.showList} >
					{obj[item.key]['showExpandButton'] ? "Show replies": "Hide replies"}
					</button>    

					<button className="btn btn-sm btn-default" id={item.key} onClick={self.showForm} >
					{obj[item.key]['showReplyButton'] ? "Reply": "Cancel"}
					</button>
				</span>
				<div>
				{obj[item.key]['showExpandList'] ? <ReplyList commentKey={item.key} replies={self.state.keys} /> : null}
				</div>
				
				<div>
				{ obj[item.key]['showReplyForm'] ? <ReplyForm user={this.state.user} commentKey={item.key} replies={self.state.keys} submitReply={self.props.submitReply} /> : null}
				</div>
				
				
				</li>;
			});
		// console.log('listItems length: ' + listItems.length);
		return (
		<ul className="comment-list">{listItems}</ul>
		);
	}
}
export default CommentList;