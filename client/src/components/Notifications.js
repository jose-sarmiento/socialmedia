import React from "react";
import { FaGift } from "react-icons/fa";
import img from "../assets/img/profiles/d1.jpg";

const Notifications = ({activeDropdown}) => {
	return (
		<div className={activeDropdown ? "drop drop--active" : "drop"}>
			<div className="drop__header">
				<h2 className="drop__heading">Notifications</h2>
			</div>

			<div className="notification">
				<figure className="notification__img-wrapper">
					<img src={img} className="notification__img" />
					<span className="notification__icon notification__icon--birthday">
						<FaGift />
					</span>
				</figure>

				<div className="notification__details">
					<p className="notification__text">
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit.
					</p>
					<small className="notification__time">January 13 2020, 9:40 am</small>
				</div>
			</div>

			<div className="notification notification--unseen">
				<figure className="notification__img-wrapper">
					<img src={img} className="notification__img" />
					<span className="notification__icon notification__icon--birthday">
						<FaGift />
					</span>
				</figure>

				<div className="notification__details">
					<p className="notification__text">
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit.
					</p>
					<small className="notification__time">January 13 2020, 9:40 am</small>
				</div>
			</div>
		</div>
	);
};

export default Notifications;
