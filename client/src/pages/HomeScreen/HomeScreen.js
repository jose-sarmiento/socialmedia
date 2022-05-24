import React, { useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { HiRefresh } from "react-icons/hi"
import { IoChatbubble, IoHeartOutline, IoHeart } from "react-icons/io5"
import { IoIosShareAlt } from "react-icons/io"
import { AppLayout } from "../../container";
import {
	Post,
	SkeletonLoading,
	AddFriend
} from "../../components";
import useFetch from "../../hooks/useFetch";
import dp from "../../assets/img/profiles/d1.jpg"
import { listPostsSuccess } from "../../store/posts";

import "./HomeScreen.scss"

const HomeScreen = () => {
	const [page, setPage] = useState(1);

	const users = useSelector(state => state.entities.users);
	const posts = useSelector(state => state.entities.posts);

	const { loading, hasNext } = useFetch('/posts', page, 10, listPostsSuccess);

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

	if (users.loading.user) return null;

	return (
		<AppLayout>
			<div className="section-container timeline">
				<div className="section-container__header">
					<h4>Your newsfeed</h4>
				</div>

				<div className="section-container__body">
					{posts.list.map((post, index) => {
						let ref = null;
						if (posts.list.length === index + 1) ref = lastElementRef;
						return (
							<Post ref={ref} post={post} key={uuidv4()} />
						);
					})}

					{loading && <SkeletonLoading count={3} />}
				</div>
			</div>

			<div className="others">
				<div className="section-container trending mb-2">
					<div className="section-container__header">
						<h4>Trending for you</h4>

						<HiRefresh />
					</div>
					<div className="trending__post">
						<div className="trending__user">
							<div className="trending__img-wrapper">
								<img src={dp} alt="trend" />
							</div>
							<span className="name">John Doe</span>
							<span className="username">@john_doe</span>
							<span className="time">3 hr</span>
						</div>
						<div className="trending__body">
							Lorem ipsum dolor sit amet consectetur adipisicing, elit. Sit ducimus deleniti cum voluptatibus delectus accusantium totam quasi recusandae, quos dolores.
						</div>
						<div className="trending__footer">
							<div className="reactions active">
								<IoHeart />
								<span>256</span>
							</div>
							<div className="comments active">
								<IoChatbubble />
								<span>543</span>
							</div>
							<div className="readmore">
								<IoIosShareAlt/>
								<span>123</span>
							</div>
						</div>
					</div>
					<div className="trending__post">
						<div className="trending__user">
							<div className="trending__img-wrapper">
								<img src={dp} alt="trend" />
							</div>
							<span className="name">John Doe</span>
							<span className="username">@john_doe</span>
							<span className="time">3 hr</span>
						</div>
						<div className="trending__body">
							Lorem ipsum dolor sit amet consectetur adipisicing, elit. Sit ducimus deleniti cum voluptatibus delectus accusantium totam quasi recusandae, quos dolores.
						</div>
						<div className="trending__footer">
							<div className="reactions">
								<IoHeart />
								<span>256</span>
							</div>
							<div className="comments">
								<IoChatbubble className="active" />
								<span>543</span>
							</div>
							<div className="readmore">
								<IoIosShareAlt/>
								<span>123</span>
							</div>
						</div>
					</div>
					<div className="trending__post">
						<div className="trending__user">
							<div className="trending__img-wrapper">
								<img src={dp} alt="trend" />
							</div>
							<span className="name">John Doe</span>
							<span className="username">@john_doe</span>
							<span className="time">3 hr</span>
						</div>
						<div className="trending__body">
							Lorem ipsum dolor sit amet consectetur adipisicing, elit. Sit ducimus deleniti cum voluptatibus delectus accusantium totam quasi recusandae, quos dolores.
						</div>
						<div className="trending__footer">
							<div className="reactions">
								<IoHeart />
								<span>256</span>
							</div>
							<div className="comments">
								<IoChatbubble />
								<span>543</span>
							</div>
							<div className="readmore">
								<IoIosShareAlt/>
								<span>123</span>
							</div>
						</div>
					</div>
				</div>

				<div className="section-container">
					<div className="section-container__header">
						<h4>People you may know</h4>

						<HiRefresh />
					</div>
					<div className="section-container__list">
						<AddFriend />
						<AddFriend />
						<AddFriend />
						<AddFriend />
						<AddFriend />
					</div>
				</div>


			</div>
		</AppLayout>
	);
};

export default HomeScreen;
