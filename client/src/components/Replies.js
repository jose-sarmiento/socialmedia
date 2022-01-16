import React from 'react'

const Replies = ({replies}) => {
	
	if (replies.length === 1) {
		return (
			<div className="comment__replies">
        <Reply reply={reply} preview={true} />
     </div>
		)
	}

	return (
		<div className="comment__replies">
      {comment.replies.map(reply => (
        <Reply reply={reply} preview={true} />
      ))}
     </div>
	)
}

export default Replies