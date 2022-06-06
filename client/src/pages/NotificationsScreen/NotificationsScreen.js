import React, { useEffect } from "react";
import moment from "moment";
import { BsCheckAll } from "react-icons/bs";
import { FiSettings, FiGift } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { AppLayout } from "../../container";

import "./NotificationsScreen.scss";
import img from "../../assets/img/profiles/d11.jpg";

import { updateNotification, updateNotificationReset, readALlNotifications } from "../../store/notifications";

const NotificationsScreen = () => {
	const notifications = useSelector(state => state.notifications);
	const { list, success } = notifications;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!success.update) return;
		dispatch(updateNotificationReset())
	}, [success.update])

	function handleNotificationClick(id, userId, type) {
		const alreadyRead = notifications.list.find(x => x._id === id);
		if (!alreadyRead.isRead) {
			dispatch(updateNotification(id, {isRead: true}))
		}
		if (type === "add-friend") {
			navigate(`/friends`, { state: { scroll: userId} })
		} else if(type === "accept-friend") {
			navigate(`/users/${userId}`)
		} else {
			return;
		}
	}


	return (
		<AppLayout>
			<div className="notifications">
				<div className="notifications__header">
					<h2>Notifications</h2>
					<button 
						disabled={!list.some(x => x.isRead === false)}
						onClick={() => dispatch(readALlNotifications())
					}>
						<BsCheckAll /> Mark as read
					</button>
				</div>
				<div className="notifications__list">
					{list.map((notif, idx) => (
						<Notification 
							notification={notif} 
							key={idx} 
							read={handleNotificationClick} 
						/>
					))}
				</div>
			</div>
		</AppLayout>
	);
};

export default NotificationsScreen;

const Notification = ({ notification, read }) => {
	let text = "text";

	if (notification.type === "add-friend")
		text = `${notification.from.firstname} ${notification.from.lastname} sent you a friend request`;
	else if (notification.type === "birthday")
		text = `${notification.from.firstname} ${notification.from.lastname} is celebrating ${notification.from.sex === "male" ? "his" : "her"} birthday today. Greet ${notification.from.sex === "male" ? "his" : "her"}now`;
	else if (notification.type === "accept-friend")
		text = `${notification.from.firstname} ${notification.from.lastname} accepted your friend request. You can now message and view ${notification.from.sex === "male" ? "his" : "her"} post`;
	else text = "";

	return (
		<div
			className={
				notification.isRead
					? "notification"
					: "notification notification--unread"
			}
			onClick={() => read(notification._id, notification.from._id, notification.type)}
		>
			<div className="notification__dot-container">
				<div className="notification__dot"></div>
			</div>
			<div className="notification__body">
				<div className="notification__left">
					<p className="notification__text">{text}</p>
					<p className="notification__footer">
						{`${moment(notification.createdAt).format(
							"MMMM D, YYYY"
						)} at ${moment(notification.createdAt).format(
							"h:m A"
						)}`}
					</p>
				</div>
				<div className="notification__right">
					{["add-friend", "accept-friend"].includes(notification.type) ? (
						<figure className="notification--friend">
							<img
								src={notification.from.profileImage}
								alt={notification.from.firstname + " picture"}
							/>
						</figure>
					) : notification?.type === "birthday" ? (
						<figure className="notification--birthday">
							<FiGift />
						</figure>
					) : (
						<figure className="notification--system">
							<FiSettings />
						</figure>
					)}
				</div>
			</div>
		</div>
	);
};
