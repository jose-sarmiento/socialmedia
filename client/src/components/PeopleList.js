import React, {useEffect} from 'react';
import AddFriendItem from './AddFriendItem';
import { FaUsers } from 'react-icons/fa';

import { addFriend } from '../store/users'
import { useSelector, useDispatch } from "react-redux"
import {useSocketContext} from '../contexts'

const PeopleList = ({ people }) => {
	const socket = useSocketContext()

	const dispatch = useDispatch();

	const users = useSelector(state => state.entities.users);

	// add friend
	 // push in friend requests
	 // add in notification

	// useEffect(() => {
	// 	console.log("recieving")
	// 	socket.current?.on("receiveNotification", payload => {
	// 		console.log(payload)
	// 	})
	// 	console.log(socket)
	// },[])

	// useEffect(() => {
	// 	if(!addFriendSuccess) return;
	// 	socket.current.emit("friendRequestSent", {
	// 		receiverId: addFriendSuccess.notification.to._id,
	// 		payload: {
	// 			...addFriendSuccess.notification
	// 		}
	// 	})
	// 	console.log(addFriendSuccess)
	// }, [addFriendSuccess])

	const add = (recipient) => dispatch(addFriend(recipient))
 
	return (
		<section className='list'>
			<div className='list__heading'>
				<div className='list__icon-wrapper'>
					<FaUsers className='list__icon' />
				</div>
				<h3 className='list__title'>People you may know</h3>
			</div>
			<div className='list__group'>
				<ul className='list__body'>
					{users.people.map(user => (
						<AddFriendItem add={add} user={user} key={user._id} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default PeopleList;
