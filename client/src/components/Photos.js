import React, { useState, useEffect } from "react";
import { useUsersContext } from "../contexts";

const Photos = () => {
	const [column1, setColumn1] = useState([]);
	const [column2, setColumn2] = useState([]);
	const [column3, setColumn3] = useState([]);
	const [column4, setColumn4] = useState([]);

	const {
		profile: { photos },
	} = useUsersContext();

	useEffect(() => {
		const numberPerColumn = photos.length / 4;

		setColumn1(paginate(photos, numberPerColumn, 1));
		setColumn2(paginate(photos, numberPerColumn, 2));
		setColumn3(paginate(photos, numberPerColumn, 3));
		setColumn4(paginate(photos, numberPerColumn, 4));
	}, [photos]);

	function paginate(array, page_size, page_number) {
		return array.slice(
			(page_number - 1) * page_size,
			page_number * page_size
		);
	}

	return (
		<div className="photos">
			<div className="column">
				{column1.map((photo) => (
					<img src={photo.thumbnail} key={photo._id} />
				))}
			</div>
			<div className="column">
				{column2.map((photo) => (
					<img src={photo.thumbnail} key={photo._id} />
				))}
			</div>
			<div className="column">
				{column3.map((photo) => (
					<img src={photo.thumbnail} key={photo._id} />
				))}
			</div>
			<div className="column">
				{column4.map((photo) => (
					<img src={photo.thumbnail} key={photo._id} />
				))}
			</div>
		</div>
	);
};
export default Photos;
