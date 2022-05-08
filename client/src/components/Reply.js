import React from 'react'
import moment from 'moment'
import img from '../assets/img/profiles/d1.jpg'

const Comment = ({ reply, preview = false }) => {

    return (
        <div className="reply">
            <div className="reply__image">
                <img src={img} alt="#" className="reply__replier-image" />
            </div>
            <div className="reply__body-wrapper">
                <div className="reply__body">
                    <h4 className="reply__replier-name">John Doe</h4>
                    <p className="reply__reply">I agree</p>
                </div>
            </div>
        </div>
    )
}

export default Comment