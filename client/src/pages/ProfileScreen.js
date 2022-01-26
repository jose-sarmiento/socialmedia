import React, { useEffect } from "react";
import {
	useParams,
	useRouteMatch,
	Switch,
	Route,
	NavLink,
} from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import {
	Header,
	LeftSide,
	Messenger,
	NewsFeed,
	About,
	Friends,
	Photos,
	Loader,
} from "../components";
import {
	viewUserProfile,
	uploadCover,
	uploadProfile,
} from "../contexts/actions/userActions";

import { useAuthContext, useUsersContext } from "../contexts";

const ProfileScreen = () => {
	const { id } = useParams();
	const { auth } = useAuthContext();
	const {
		people = [],
		profile,
		loadingUser,
		loadingProfile,
		dispatch,
	} = useUsersContext();
	const { path, url } = useRouteMatch();

	useEffect(() => {
		if (id) viewUserProfile({ userId: id, token: auth.token })(dispatch);
	}, [auth, id]);

	const handleCoverChange = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("cover", e.target.files[0]);
		uploadCover({ formData, token: auth.token })(dispatch);
	};

	const handleProfileChange = (e) => {
		const formData = new FormData();
		formData.append("profile", e.target.files[0]);
		uploadProfile({ formData, token: auth.token })(dispatch);
	};

	return (
		<div className="main-container container">
			<Header />

			<LeftSide />

			<div className="middle-content">
				{loadingUser && <Loader />}
				{profile && (
					<>
						<div className="profile mb-1">
							<div className="cover">
								{profile.coverImage && (
									<img
										src={profile.coverImage}
										alt="cover"
										className="cover__image"
									/>
								)}

								<div className="cover__footer">
									<h1 className="profile__name">{`${profile.firstname} ${profile.lastname}`}</h1>

									{auth._id === profile._id && (
										<>
											<label
												className="profile__edit-cover"
												htmlFor="cover"
											>
												<i className="profile__edit-icon">
													<FaCamera className="mr-1" />
													Edit Cover
												</i>
											</label>
											<input
												type="file"
												accept="image/png,image/jpeg"
												name="cover"
												id="cover"
												onChange={handleCoverChange}
												style={{ display: "none" }}
											/>
										</>
									)}
								</div>
							</div>

							<div className="profile__footer">
								<figure className="profile__image-wrapper">
									<div className="profile__container">
										<img
											src={profile.profileImage}
											alt="profile"
											className="profile__image"
										/>

										{auth._id === profile._id && (
											<>
												<label
													className="profile__edit-profile"
													htmlFor="profile"
												>
													<i className="profile__edit-icon">
														<FaCamera className="mr-1" />
													</i>
												</label>
												<input
													type="file"
													accept="image/png,image/jpeg"
													name="profile"
													id="profile"
													onChange={
														handleProfileChange
													}
													style={{ display: "none" }}
												/>
											</>
										)}
									</div>
								</figure>

								<div className="profile__links">
									<ul className="full-h-nav">
										<li className="full-h-nav__item">
											<NavLink
												exact={true}
												to={url}
												className={(isActive) =>
													isActive
														? "full-h-nav__link full-h-nav__link--active"
														: "full-h-nav__link"
												}
											>
												Timeline
											</NavLink>
										</li>
										<li className="full-h-nav__item">
											<NavLink
												to={`${url}/about`}
												className={(isActive) =>
													isActive
														? "full-h-nav__link full-h-nav__link--active"
														: "full-h-nav__link"
												}
											>
												About
											</NavLink>
										</li>
										<li className="full-h-nav__item">
											<NavLink
												to={`${url}/friends`}
												className={(isActive) =>
													isActive
														? "full-h-nav__link full-h-nav__link--active"
														: "full-h-nav__link"
												}
											>
												Friends
											</NavLink>
										</li>
										<li className="full-h-nav__item">
											<NavLink
												to={`${url}/photos`}
												className={(isActive) =>
													isActive
														? "full-h-nav__link full-h-nav__link--active"
														: "full-h-nav__link"
												}
											>
												Photos
											</NavLink>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<Switch>
							<Route exact path={path}>
								<NewsFeed />
							</Route>
							<Route path={`${path}/about`}>
								<About profile={profile} />
							</Route>
							<Route path={`${path}/friends`}>
								<Friends
									friends={profile.friends}
									friendRequests={profile.friendRequests}
									people={people}
								/>
							</Route>
							<Route path={`${path}/photos`}>
								<Photos />
							</Route>
						</Switch>
					</>
				)}
			</div>

			<Messenger />
		</div>
	);
};

export default ProfileScreen;
