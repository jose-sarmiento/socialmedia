import React, { useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { HiRefresh } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { IoChatbubble, IoHeartOutline, IoHeart } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { AppLayout } from "../../container";
import { FaGift } from "react-icons/fa";
import { Post, SkeletonLoading, AddFriend } from "../../components";
import useFetch from "../../hooks/useFetch";
import dp from "../../assets/img/profiles/d1.jpg";
import { listPostsSuccess } from "../../store/posts";

import "./HomeScreen.scss";

const HomeScreen = () => {
	const [page, setPage] = useState(1);

	const navigate = useNavigate();

	const users = useSelector(state => state.entities.users);
	const posts = useSelector(state => state.entities.posts);

	const { loading, hasNext } = useFetch("/posts", page, 10, listPostsSuccess);

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

	function handleCommentClick(postId) {
		navigate(`/posts/${postId}`, { state: { focusCommentInput: true } });
	}

	if (users.loading.user) return null;

	return (
		<AppLayout page="homepage">
			<div className="section-container timeline">
				<div className="section-container__header">
					<h4>Your newsfeed</h4>
				</div>

				<div className="section-container__body">
					{posts.list.map((post, index) => {
						let ref = null;
						if (posts.list.length === index + 1)
							ref = lastElementRef;
						return (
							<Post
								ref={ref}
								post={post}
								key={uuidv4()}
								handleCommentClick={handleCommentClick}
							/>
						);
					})}

					{loading && <SkeletonLoading count={3} />}
				</div>
			</div>

			<div className="others">
				<div className="list list--birthdays">
					<div className="list__header">
						<FaGift />
						<h4>Birthdays</h4>
						{users.birthdays.length > 2 && <Link to="/friends">See all</Link>}
					</div>
					{users.loading.get ? (
						<div className="birthday">
							<figure className="skeleton"></figure>
							<div className="birthday__user">
								<p className="birthday__username skeleton"></p>
								<p className="birthday__age skeleton"></p>
							</div>
						</div>
					) : (
						<>
							{users.birthdays.length === 0 ? (
								<div className="birthday birthday--none">
									<span className="birthday__no-birthday">
										<FaGift /> No birthdays today
									</span>
								</div>
							) : (
								<>
									{users.birthdays.slice(0, 2).map((birthday, idx) => {
										let today = new Date();
										let birthDate = new Date(
											birthday.birthdate
										);
										let age =
											today.getFullYear() -
											birthDate.getFullYear();
										return (
											<div className="birthday" key={idx}>
												<figure>
													<img
														src={
															birthday.profileImage
														}
														alt="birthday user"
													/>
												</figure>
												<div className="birthday__user">
													<p className="birthday__username">{`${birthday.firstname} ${birthday.lastname}`}</p>
													<p className="birthday__age">
														{age} years old
													</p>
												</div>
											</div>
										);
									})}
								</>
							)}
						</>
					)}
				</div>

				<div className="list list--requests">
					<div className="list__header">
						<FaGift />
						<h4>Friend Requests</h4>
						<span>See all</span>
					</div>
					{users.loading.get ? (
						<div className="birthday">
							<figure className="skeleton"></figure>
							<div className="birthday__user">
								<p className="birthday__username skeleton"></p>
								<p className="birthday__age skeleton"></p>
							</div>
						</div> 
						) : (
						<>
							{users.friends.length === 0 ? (
								<div className="request request--none">
									<span className="birthday__no-request">
										<Link to="/friends"><FiUserPlus /> Add some friends now</Link>
									</span>
								</div>
							) : (
								<>
									{users.friends.slice(0, 2).map((friend, idx) => (
										<div className="request" key={idx}>
											<figure>
												<img src={friend.profileImage} alt="request user" />
											</figure>
											<div className="request__user">
												<p className="request__username">{`${friend.firstname} ${friend.lastname}`}</p>
												<p className="request__age">@{friend.username}</p>
												<div className="request__actions">
													<button className="request__action">
														Confirm
													</button>
													<button className="request__action">
														Delete
													</button>
												</div>
											</div>
										</div>
									))}
								</>
							)}
						</>)
					}

				</div>

				<div className="list list--actives">
					<div className="list__header">
						<FaGift />
						<h4>Active Contacts</h4>
						<span>See all</span>
					</div>
					<div className="birthday">
						<figure>
							<img src={dp} alt="birthday user" />
						</figure>
						<div className="birthday__user">
							<p className="birthday__username">Michael Jordan</p>
							<p className="birthday__age">22 years old</p>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default HomeScreen;

{
	/*<div className="others">
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

			</div>*/
}
