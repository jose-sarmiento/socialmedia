import React from 'react';
import moment from 'moment';
import { BsCheckAll } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion/dist/framer-motion';
import { useSelector } from 'react-redux';

import './Message.scss';

const Message = React.forwardRef((props, ref) => {
  const { message, sameAsPrevious, isLastItem } = props;

  const auth = useSelector((state) => state.auth);

  return (
    <motion.div
      ref={ref}
      className={
        message?.sender._id === auth.user._id
          ? 'message message--me'
          : 'message'
      }
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {message?.sender._id !== auth.user._id && !sameAsPrevious ? (
        <div className="message__user-image">
          <img
            src={message?.sender.profileImage}
            alt={`${message?.sender.firstname} dp`}
          />
        </div>
      ) : (
        <div className="message__user-image" />
      )}
      <div className="message__content-wrapper">
        <div className="message__box">
          <p>{message?.text}</p>
          <span className="message__time">
            {moment(message?.createdAt).format('hh:mm')}
          </span>
        </div>
      </div>

      {isLastItem &&
        message?.sender._id === auth.user._id &&
        (message?.sent === true ? (
          <span className="message__sent-indicator">
            <BsCheckAll />
          </span>
        ) : (
          <span className="message__sent-indicator message__sent-indicator--sending">
            <AiOutlineLoading3Quarters />
          </span>
        ))}
    </motion.div>
  );
});

export default Message;
