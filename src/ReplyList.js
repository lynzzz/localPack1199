import React, { Component } from 'react';
import './ReplyList.css';

class ReplyList extends Component {


	render() {
		var replyEntries = this.props.replies;
		var listItems = replyEntries[this.props.commentKey]['replies'].map((item) => {
				
				return <li key={item.key}>

				<p className="text-comment-reply" >{item.content}</p> <span className="author-date">by {item.author} on {item.date}</span>
				
				</li>;
			});
		// console.log('reply listItems length: ' + listItems.length);
		return (
		<ul>{listItems}</ul>
		);
	}
}
export default ReplyList;