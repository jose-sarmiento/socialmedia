import React, { useState, useRef, useEffect } from "react";
import { FaUserCog, FaSave, FaGraduationCap } from "react-icons/fa";
import { FiCamera, FiInfo, FiPhone, FiLock } from "react-icons/fi";
import { useSelector } from "react-redux";
import { diff } from "deep-object-diff";
import _ from "lodash";

const ViewProfile = () => {
	const users = useSelector(state => state.entities.users);
	const { viewUser, loading, success } = users;

	const bioRef = useRef();

	useEffect(() => {
		bioRef.current.style.height = bioRef.current.scrollHeight + "px";
	});

	function formatDate(date) {
		var curr = new Date(date);
		return curr.toISOString().substr(0, 10);
	}

	return (
		<div className="section-container edit-profile">
			<div className="section-container__header">
				<div className="d-flex">
					<FaUserCog className="section-container__heading-icon" />
					<h4>{`Viewing ${viewUser?.firstname}'s Profile`}</h4>
				</div>
			</div>

			<div className="section-container__body edit-profile__body">
				<form >
					<h6>{`${viewUser?.firstname}'s Profile Picture`}</h6>
					<section className="edit-profile__profile">
						<figure>
							<img
								src={viewUser?.profileImage}
								alt={viewUser?.firstname + " photo"}
							/>
						</figure>
					</section>

					<textarea name="bio" readOnly={true} ref={bioRef} defaultValue={viewUser?.bio}></textarea>

					<fieldset>
						<span className="legend">
							<FiInfo /> User Information
						</span>
						<div className="form-group">
							<label>First name</label>
							<input
								readOnly={true}
								type="text"
								name="firstname"
								defaultValue={viewUser?.firstname}
							/>
						</div>
						<div className="form-group">
							<label>Last name</label>
							<input
								readOnly={true}
								type="text"
								name="lastname"
								defaultValue={viewUser?.lastname}
							/>
						</div>
						<div className="form-group">
							<label>Middle name</label>
							<input
								readOnly={true}
								type="text"
								name="middlename"
								defaultValue={viewUser?.middlename}
							/>
						</div>
						<div className="form-group">
							<label>Birth date</label>
							<input
								readOnly={true}
								type="date"
								name="birthdate"
								defaultValue={viewUser && formatDate(viewUser.birthdate)}
							/>
						</div>
						<div className="form-group">
							<label>Gender</label>
							<select
								readOnly={true}
								name="sex"
								defaultValue={viewUser?.sex}
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>
					</fieldset>

					<fieldset>
						<span className="legend">
							<FiLock /> Account Information
						</span>
						<div className="form-group">
							<label>Username</label>
							<input
								readOnly={true}
								type="text"
								name="username"
								defaultValue={viewUser?.username}
							/>
						</div>
						<div className="form-group">
							<label >Email</label>
							<input
								readOnly={true}
								type="text"
								name="email"
								defaultValue={viewUser?.email}
							/>
						</div>
					</fieldset>

					<fieldset>
						<span className="legend">
							<FiPhone /> Contact Information
						</span>
						<div className="form-group">
							<label >Address</label>
							<input
								readOnly={true}
								type="text"
								name="address"
								defaultValue={viewUser?.address}
							/>
						</div>
						<div className="form-group">
							<label >Status</label>
							<select
								readOnly={true}
								name="status"
								defaultValue={viewUser?.status}
							>
								<option value="1">Single</option>
								<option value="2">Engaged</option>
								<option value="3">Married</option>
								<option value="4">Separated</option>
							</select>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								readOnly={true}
								type="text"
								name="phone"
								defaultValue={viewUser?.phone}
							/>
						</div>
					</fieldset>

					<fieldset>
						<span className="legend">
							<FaGraduationCap /> Education
						</span>
						<div className="form-group">
							<label >Elementary</label>
							<input
								readOnly={true}
								type="text"
								name="elementary"
								defaultValue={viewUser?.school?.elementary}
							/>
						</div>
						<div className="form-group">
							<label>High School</label>
							<input
								readOnly={true}
								type="text"
								name="highschool"
								defaultValue={viewUser?.school?.highschool}
							/>
						</div>
						<div className="form-group">
							<label>College</label>
							<input
								readOnly={true}
								type="text"
								name="college"
								defaultValue={viewUser?.school?.college}
							/>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default ViewProfile;
