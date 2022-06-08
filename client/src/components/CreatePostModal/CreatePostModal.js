import React, { useState, useEffect, useRef } from "react";
import {
	FaCamera,
	FaPaperPlane,
	FaTimes,
	FaVideo,
	FaHeading,
	FaImages
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
// import { useDropzone } from "react-dropzone";
import { ProgressBar } from "../../components";

import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../store/posts";
import { closeModal } from "../../store/ui";

import "./CreatePostModal.scss";

const CreatePostModal = () => {
	const [body, setBody] = useState("");
	const [files, setFiles] = useState([]);
	const [_error, setError] = useState(null);

	const dispatch = useDispatch();
	const reader = new FileReader();
	const imageInputRef = useRef();
	const videoInputRef = useRef();

	const users = useSelector(state => state.entities.users);
	const { user } = users;
	const posts = useSelector(state => state.entities.posts);
	const { loading, success, error } = posts;
	const ui = useSelector(state => state.ui);

	useEffect(() => {
		if (!success.create) return;
		clearFields();
		dispatch(closeModal())
	}, [success.create]);

	function handleFileSelect(e) {
		const newfiles = [...e.target.files].filter(x => !files.some(file => file.name === x.name))
		setFiles([...files, ...newfiles]);
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		setError(null)
		if (loading.create) return;
		if (!body && files.length === 0) {
			return setError("Cannot proceed. Please provide required fields")
		};

		const formData = new FormData();
		if (body) formData.append("body", body);

		files.forEach(file => {
			formData.append("files", file);
		});

		dispatch(createPost(formData));
	}

	function handlePreviewDelete(name) {
		imageInputRef.current.value = null;
		setFiles(files.filter(file => file.name !== name));
	}

	function clearFields() {
		setBody("");
		setFiles([]);
	}

	return (
		<AnimatePresence>
			{ui.modalIsOpen && (
				<motion.div
					className="modal"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
                    onClick={e => {
                        if (e.target.classList.contains('modal')) {
                            dispatch(closeModal())
                        }
                    }}
				>
					<div className="modal__body">
						<button
							className="modal__close"
							onClick={() => dispatch(closeModal())}
						>
							&times;
						</button>

						<h2 className="modal__title">Create Post</h2>

						<div className="create-post">
							<figure className="create-post__user">
								<img
									src={user?.profileImage}
									alt={user?.firstname}
								/>
							</figure>
							<form
								className="create-post__form"
								encType="multipart/form-data"
							>
								<textarea
									className="create-post__input"
									placeholder={`What's in your mind ${user?.firstname}?`}
									value={body}
									onChange={e => setBody(e.target.value)}
								></textarea>

								<div className="create-post__progress">
									{posts.loading.create && <div className="create-post__bar"></div>}
								</div>

								<label htmlFor="images"><FaImages /> Add Image/s</label>
								<input
									type="file"
									accept="image/png,image/jpeg"
									multiple="multiple"
									id="images"
									onChange={handleFileSelect}
									className="hide"
									ref={imageInputRef}
								/>
							</form>
						</div>

							<div className="previews">
						{files && files.length > 0 && (
							<>
								<div className="previews__previews">
									{files.slice(0,3).map((file, index) => (
										<div className="preview" key={index}>
											<img
													src={URL.createObjectURL(file)}
													alt="testt"
												/>
											
											<h4 className="preview__name">
												{file.name}
											</h4>
											<FaTimes
												className="preview__icon"
												onClick={() =>
													handlePreviewDelete(
														file.name
													)
												}
											/>
										</div>
									))}
								</div>
								{files.length > 3 && <span className="previews__more-count">{`+${files.length - 3} more image/s`}</span>}
							</>
						)}

							</div>

						<div className="modal__footer">
							<button className="modal__action"
							onClick={() => dispatch(closeModal())}>Cancel</button>
							<button 
								className="modal__action" 
								disabled={loading.create || (!body && files.length === 0)}
								onClick={handleFormSubmit}
							>Submit</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CreatePostModal;
