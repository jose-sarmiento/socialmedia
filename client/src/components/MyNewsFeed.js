import React, { useEffect, useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaImage, FaUserFriends } from "react-icons/fa";
import { PostList, CreatePost, Loader, Post } from "../components";
import usePaginateMyPosts from "../hooks/usePaginateMyPosts";

import { useSelector, useDispatch } from "react-redux";
import { selectRecentPhotos } from "../store/users";

const MyNewsFeed = () => {
	const [page, setPage] = useState(1);

	const users = useSelector(state => state.entities.users);
	const {user, friends} = users;

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
		<div className="profile__grid">
			<div className="personal-info">
				<div className="overview">
					<div className="card">
						<div className="card__header">
							<FaUserFriends className="card__icon" />
							<span className="card__title">Friends</span>
							<span className="card__middot">&#9679;</span>
							<span className="count">
								{friends.length}
							</span>
						</div>
						{friends.length > 0 && (
							<div className="card__body">
								<div className="flex__images">
									{friends.map((friend, idx) => (
										<figure
											className={`flex__image flex__image--${
												idx + 1
											}`}
											key={idx}
										>
											<img
												src={friend.profileImage}
												key={friend._id}
											/>
										</figure>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="card">
						<div className="card__header">
							<FaImage className="card__icon" />
							<span className="card__title">Photos</span>
							<span className="card__middot">&#9679;</span>
							<span className="count">
								{user.photos.length}
							</span>
						</div>
						<div className="card__body">
							<div className="grid__images">
								{recentPhotos.map((photo, idx) => (
									<div className={`grid__image grid__image--${idx + 1}`}>
										<img src={photo.thumbnail} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="newsfeed">
				<CreatePost variant="small" />

				{posts.myPosts.map((post, index) => {
					let ref = null;
					if (posts.myPosts.length === index + 1) ref = lastElementRef;
					return (
						<Post ref={ref} post={post} key={uuidv4()} />
					);
				})}

				{loading && <Loader />}
			</div>
		</div>
	);
};

export default MyNewsFeed;
