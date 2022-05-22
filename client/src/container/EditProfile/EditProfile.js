import React, { useState, useRef, useEffect } from "react";
import { FaUserCog, FaSave, FaGraduationCap } from "react-icons/fa";
import { FiCamera, FiInfo, FiPhone, FiLock } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { diff } from "deep-object-diff";
import _ from "lodash";
import { uploadProfile, updateUser } from "../../store/users";

import "./EditProfile.scss";

const EditProfile = () => {
	const users = useSelector(state => state.entities.users);
	const { user, loading, success } = users;

	const [initial, setInitial] = useState();
	const [data, setData] = useState();
	const [updateObj, setUpdateObj] = useState();

	const bioRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const init = { ...user, photos: null };
		if (!user.middlename) init.middlename = "";
		setInitial(init);
		setData(init)
	},[user])

	useEffect(() => {
		setUpdateObj(diff(initial, data));
	}, [data]);

	useEffect(() => {
		bioRef.current.style.height = bioRef.current.scrollHeight + "px";
	});

	function textAreaAdjust() {
		bioRef.current.style.height = bioRef.current.scrollHeight + "px";
	}

	function formatDate(date) {
		var curr = new Date(date);
		return curr.toISOString().substr(0, 10);
	}

	function handleInputChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	function handleEducationChange(e) {
		setData({
			...data,
			school: { ...data.school, [e.target.name]: e.target.value },
		});
	}

	function handleProfileChange(e) {
		const formData = new FormData();
        formData.append("profile", e.target.files[0]);
        dispatch(uploadProfile(formData));
        e.target.value = "";
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (_.isEmpty(updateObj)) return;
		dispatch(updateUser(updateObj))
	}

	return (
		<div className="section-container edit-profile">
			<div className="section-container__header">
				<div className="d-flex">
					<FaUserCog className="section-container__heading-icon" />
					<h4>Edit Profile</h4>
				</div>
			</div>

			<div className="section-container__body edit-profile__body">
				<form spellCheck={false} onSubmit={handleSubmit}>
					<button
						className="edit-profile__save-btn"
						disabled={_.isEmpty(updateObj) || loading.update}
					>
						<FaSave /> Save Changes
					</button>
					<h6>Your Profile Picture</h6>
					<section className="edit-profile__profile">
						<figure>
							<img
								src={data?.profileImage}
								alt={data?.firstname + " photo"}
							/>
						</figure>
						<div>
							<label htmlFor="choose-profile" className={loading.profile && "disabled"}>
								Change your photo
							</label>
							<input
								type="file"
								accept="image/png,image/jpeg"
								name="profile"
								id="choose-profile"
								onChange={ handleProfileChange }
								style={{ display: "none" }}
							/>
							<label>
								<FiCamera /> Take Photo
							</label>
						</div>
					</section>

					<textarea
						name="bio"
						id="bio"
						ref={bioRef}
						value={data?.bio}
						onChange={handleInputChange}
						onKeyUp={textAreaAdjust}
					></textarea>

					<fieldset>
						<span className="legend">
							<FiInfo /> User Information
						</span>
						<div className="form-group">
							<label htmlFor="firstname">First name</label>
							<input
								type="text"
								name="firstname"
								value={data?.firstname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Last name</label>
							<input
								type="text"
								name="lastname"
								value={data?.lastname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="middlename">Middle name</label>
							<input
								type="text"
								name="middlename"
								value={data?.middlename}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="birthdate">Birth date</label>
							<input
								type="date"
								name="birthdate"
								value={data && formatDate(data.birthdate)}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="sex">Gender</label>
							<select
								name="sex"
								value={data?.sex}
								onChange={handleInputChange}
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
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								value={data?.username}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								name="email"
								value={data?.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">New Password</label>
							<input
								type="password"
								name="password"
								value={data?.password}
								onChange={handleInputChange}
							/>
						</div>
					</fieldset>

					<fieldset>
						<span className="legend">
							<FiPhone /> Contact Information
						</span>
						<div className="form-group">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								name="address"
								value={data?.address}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="status">Status</label>
							<select
								name="status"
								value={data?.status}
								onChange={handleInputChange}
							>
								<option value="1">Single</option>
								<option value="2">Engaged</option>
								<option value="3">Married</option>
								<option value="4">Separated</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="phone">Phone</label>
							<input
								type="text"
								name="phone"
								value={data?.phone}
								onChange={handleInputChange}
							/>
						</div>
					</fieldset>

					<fieldset>
						<span className="legend">
							<FaGraduationCap /> Education
						</span>
						<div className="form-group">
							<label htmlFor="elementary">Elementary</label>
							<input
								type="text"
								name="elementary"
								value={data?.school?.elementary}
								onChange={handleEducationChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="highschool">High School</label>
							<input
								type="text"
								name="highschool"
								value={data?.school?.highschool}
								onChange={handleEducationChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="college">College</label>
							<input
								type="text"
								name="college"
								value={data?.school?.college}
								onChange={handleEducationChange}
							/>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
