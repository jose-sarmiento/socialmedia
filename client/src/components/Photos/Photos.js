import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { BsImages } from "react-icons/bs";

import { openSlider } from "../../store/ui";
import { deletePhoto } from "../../store/users";

import "./Photos.scss";

const Photos = ({ photos = [] }) => {
	const dispatch = useDispatch();
	const slider = useSelector(state => state.ui.slider);

	return (
		<div className="section-container photos">
			<div className="section-container__header">
				<div className="d-flex">
					<BsImages className="section-container__heading-icon" />
					<h4>Your photos</h4>
				</div>
			</div>

			<div className="section-container__body photos__body">
				{photos.map((photo, idx) => (
					<div key={photo._id} className="photos__img-wrapper">
						<FiTrash2
							onClick={() => dispatch(deletePhoto(photo._id))}
						/>
						<img
							src={photo.thumbnail}
							onClick={() => {
								dispatch(openSlider(photos, idx));
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
export default Photos;
