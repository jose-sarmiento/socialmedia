import React, { useEffect, useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaImage, FaUserFriends } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import {
	PostList,
	CreatePost,
	Loader,
	Post,
	SkeletonLoading,
} from "../../components";
import usePaginateMyPosts from "../../hooks/usePaginateMyPosts";

import { selectRecentPhotos } from "../../store/users";

import "./Newsfeed.scss";

const Newsfeed = () => {
	const [page, setPage] = useState(1);

	const users = useSelector(state => state.entities.users);
	const { user, friends } = users;

	const posts = useSelector(state => state.entities.posts);

	const recentPhotos = selectRecentPhotos(users);

	const { loading, hasNext } = usePaginateMyPosts(page, 10);

	const observer = useRef();
	const lastElementRef = useCallback(
		node => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasNext) {
					setPage(prevPage => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasNext]
	);

	return (
		<div className="section-container newsfeed">
			<div className="section-container__header">
				<h4>Newsfeed</h4>
				<HiRefresh />
			</div>

			<div className="section-container__body">
				{posts.myPosts.map((post, index) => {
					let ref = null;
					if (posts.myPosts.length === index + 1)
						ref = lastElementRef;
					return <Post ref={ref} post={post} key={uuidv4()} />;
				})}

				{loading && <SkeletonLoading count={3} />}
			</div>
		</div>
	);
};

export default Newsfeed;
