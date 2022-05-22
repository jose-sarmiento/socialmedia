import React from "react";
import "./Post.scss";

const SkeletonLoading = ({ wide, count = 1 }) => {
	return (
		<>
			{[...Array(count).keys()].map((count, idx) => (
				<div
					key={idx}
					className={
						wide
							? "post post--wide post--skeleton"
							: "post post--skeleton"
					}
				>
					{!wide && (
						<div className="post__left">
							<figure className="post__user-img skeleton"></figure>
						</div>
					)}

					<div className="post__right">
						<div className="post__header">
							{wide && (
								<figure className="post__user-img"></figure>
							)}
							<h2 className="post__heading">
								<span className="post__name skeleton"></span>
								<span className="middot">&#9679;</span>
								<span className="post__follow skeleton"></span>
							</h2>

							<span className="post__time skeleton"></span>
						</div>

						<div className="post__body">
							<div className="post__description">
								<p className="post__caption skeleton"></p>
								<p className="post__caption skeleton"></p>
								<p className="post__caption skeleton"></p>
								<p className="post__caption skeleton "></p>
							</div>

							<div className="post__media post__media--3">
								<div className="post__image-wrapper skeleton"></div>
								<div className="post__image-wrapper skeleton"></div>
								<div className="post__image-wrapper skeleton"></div>
							</div>
						</div>

						<div className="post__footer">
							<div className="reactions">
								<span className="skeleton"></span>
								<span className="skeleton"></span>
							</div>
							<div className="comments">
								<span className="skeleton"></span>
								<span className="skeleton"></span>
							</div>
							<div className="readmore">
								<span className="skeleton"></span>
								<span className="skeleton"></span>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default SkeletonLoading;
