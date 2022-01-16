import React from 'react'
import moment from 'moment'
import img from '../assets/img/profiles/d1.jpg'

const Comment = ({reply, preview=false}) => {

	return (
		<div className="reply">
      <img src={reply.userProfileImage} alt="#" className="reply__replier-image" />
      <div className="reply__body-wrapper">
        <div className="reply__body">
          <h4 className="reply__replier-name">{reply.userName}</h4>
          <p className="reply__reply">{reply.reply}</p>
        </div>
        {!preview && (
          <div className="comment__actions">
            <button className="comment__btn">Like</button>
            <button className="comment__btn">Reply</button>
          </div>
        )}
      </div>
    </div>
	)
}

export default Comment