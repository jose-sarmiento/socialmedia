import React, { useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { AppLayout } from "../container";
import {
	CreatePost,
	Post,
	Loader,
} from "../components";
import usePaginatePosts from "../hooks/usePaginatePosts";

const HomeScreen = () => {
	const [page, setPage] = useState(1);

	const users = useSelector(state => state.entities.users);
	const posts = useSelector(state => state.entities.posts);

	const { loading, hasNext } = usePaginatePosts(page, 10);

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

	if (users.loading.user) return <Loader />;

	return (
		<AppLayout>
			<div className="timeline">
				<CreatePost />

				{posts.list.map((post, index) => {
					let ref = null;
					if (posts.list.length === index + 1) ref = lastElementRef;
					return (
						<Post ref={ref} post={post} key={uuidv4()} />
					);
				})}

				{loading && <Loader />}
			</div>
		</AppLayout>
	);
};

export default HomeScreen;
