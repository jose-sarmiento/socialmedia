import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { profileLinks } from '../data';
import { useAuthContext } from '../contexts';

const Profile = ({ user, uploadCover, uploadProfile }) => {
	const { auth } = useAuthContext();
	let { path, url } = useRouteMatch();

	const handleCoverChange = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('cover', e.target.files[0]);
		uploadCover(formData);
	};

	const handleProfileChange = e => {
		const formData = new FormData();
		formData.append('profile', e.target.files[0]);
		uploadProfile(formData);
	};

	if (!user) return null;

	return (
		<div className='profile mb-1'>
			<div className='cover'>
				{user.coverImage && (
					<img
						src={user.coverImage}
						alt='cover'
						className='cover__image'
					/>
				)}

				<div className='cover__footer'>
					<h1 className='profile__name'>{`${user.firstname} ${user.lastname}`}</h1>

					{auth._id === user._id && (
						<>
							<label className='profile__edit-cover' htmlFor='cover'>
								<i className='profile__edit-icon'>
									<FaCamera className='mr-1' />
									Edit Cover
								</i>
							</label>
							<input
								type='file'
								accept='image/png,image/jpeg'
								name='cover'
								id='cover'
								onChange={handleCoverChange}
								style={{ display: 'none' }}
							/>
						</>
					)}
				</div>
			</div>

			<div className='profile__footer'>
				<figure className='profile__image-wrapper'>
					<div className='profile__container'>
						<img
							src={user.profileImage}
							alt='profile'
							className='profile__image'
						/>

						{auth._id === user._id && (
							<>
								<label
									className='profile__edit-profile'
									htmlFor='profile'
								>
									<i className='profile__edit-icon'>
										<FaCamera className='mr-1' />
									</i>
								</label>
								<input
									type='file'
									accept='image/png,image/jpeg'
									name='profile'
									id='profile'
									onChange={handleProfileChange}
									style={{ display: 'none' }}
								/>
							</>
						)}
					</div>
				</figure>

				<div className='profile__links'>
					<ul className='full-h-nav'>
						<li className='full-h-nav__item'>
							<Link to={`${url}/timeline`} className='full-h-nav__link'>
								Timeline
							</Link>
						</li>
						<li className='full-h-nav__item'>
							<Link to={`${url}/about`} className='full-h-nav__link'>
								About
							</Link>
						</li>
						<li className='full-h-nav__item'>
							<Link to={`${url}/friends`} className='full-h-nav__link'>
								Friends
							</Link>
						</li>
						<li className='full-h-nav__item'>
							<Link to={`${url}/photos`} className='full-h-nav__link'>
								Photos
							</Link>
						</li>
					</ul>
				</div>

			</div>
		</div>
	);
};

export default Profile;
