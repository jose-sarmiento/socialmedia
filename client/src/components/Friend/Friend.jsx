import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';

import './Friend.scss';

function Friend({ friend }) {
  return (
    <motion.li className="friend">
      <figure>
        <img src={friend?.profileImage} alt="imgz" />
      </figure>
      <div>
        <Link to={`/users/${friend?._id}`}>
          {`${friend?.firstname} ${friend?.lastname}`}
        </Link>
        <span>@{friend?.username}</span>
      </div>
    </motion.li>
  );
}

export default Friend;
