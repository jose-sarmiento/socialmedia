import React, { useEffect } from "react";
import {
	useParams,
	Routes,
	Route,
	NavLink,
} from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import {
	NewsFeed,
	About,
	Friends,
	Photos,
	Loader,
} from "../components";

import { useSelector } from "react-redux"
import { viewUserProfile } from "../store/users"
import { AppLayout } from "../container";

const ProfileScreen = () => {
	const { id } = useParams();

	// const auth = useSelector(state => state.auth);
	// const users = useSelector(state => state.entities.users);

	// useEffect(() => {
	// 	dispatch(viewUserProfile(id));
	// }, [id, useParams]);

	return (
		<AppLayout>
			<h1>View User Profile</h1>
		</AppLayout>
	);
};

export default ProfileScreen;
