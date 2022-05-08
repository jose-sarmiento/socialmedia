import React, { useState } from 'react';
import moment from 'moment';
import {
	FaEdit,
	FaSave,
	FaUser,
	FaPhone,
	FaInfoCircle,
	FaGraduationCap,
} from 'react-icons/fa';
import {updateUser} from '../contexts/actions/userActions'
import { useUsersContext, useAuthContext } from '../contexts';

const About = ({profile}) => {
	const { auth } = useAuthContext();
	const { dispatch } = useUsersContext();
	const [isEditMode, setIsEditMode] = useState(false);
	const [inputs, setInputs] = useState({
		firstname: profile.firstname,
		lastname: profile.lastname,
		middlename: profile.middlename,
		birthdate: profile.birthdate,
		email: profile.email,
		phone: profile.phone,
		address: profile.address,
		school: profile.school,
		bio: profile.bio,
		status: profile.status,
	});

	const handleInputChange = e => {
		const { name, value } = e.target;
		const school = ['elementary', 'highschool', 'college'];
		if (school.indexOf(name) != -1) {
			return setInputs({
				...inputs,
				school: {
					...inputs.school,
					[name]: value,
				},
			});
		}
		setInputs({ ...inputs, [name]: value });
	};

	const handleBtnClick = e => {
		e.preventDefault();
		setIsEditMode(state => !state);

		if (!isEditMode) return;

		const update = {
			firstname: inputs.firstname,
			lastname: inputs.lastname,
			birthdate: inputs.birthdate,
			email: inputs.email,
		};

		if (inputs.middlename) update.middlename = inputs.middlename;
		if (inputs.phone) update.phone = inputs.phone;
		if (inputs.address) update.address = inputs.address;
		if (inputs.school) update.school = inputs.school;
		if (inputs.bio) update.bio = inputs.bio;
		if (inputs.status) update.status = inputs.status;

		updateUser({userId: profile._id, update, token: auth.token})(dispatch)
	};

	return (
		<div className='about'>
			<form className='about__form'>
				<div className='editBtn-wrapper'>
					<button className='editBtn' onClick={handleBtnClick}>
						{isEditMode ? (
							<>
								<FaSave className='about__icon about__icon--save mr-1' />
								Save
							</>
						) : (
							<>
								<FaEdit className='about__icon about__icon--save mr-1' />
								Edit Info
							</>
						)}
					</button>
				</div>

				<div>
					<fieldset>
						<legend>
							<span>
								<FaUser className='about__icon' />
							</span>
							Personal Information:
						</legend>
						{!isEditMode && (
							<div className='form__group'>
								<label className='about__label' htmlFor='name'>
									Name:
								</label>
								<input
									disabled={!isEditMode}
									className={
										isEditMode
											? 'about__input about__input--active'
											: 'about__input'
									}
									type='text'
									id='name'
									name='name'
									value={
										inputs.middlename
											? `${inputs.firstname} ${inputs.lastname} ${inputs.lastname}`
											: `${inputs.firstname} ${inputs.lastname}`
									}
								/>
							</div>
						)}

						{isEditMode && (
							<>
								<div className='form__group'>
									<label className='about__label' htmlFor='firstname'>
										Firstname:
									</label>
									<input
										disabled={!isEditMode}
										className={
											isEditMode
												? 'about__input about__input--active'
												: 'about__input'
										}
										type='text'
										id='firstname'
										name='firstname'
										value={inputs.firstname}
										onChange={handleInputChange}
									/>
								</div>

								<div className='form__group'>
									<label className='about__label' htmlFor='middlename'>
										Middlename:
									</label>
									<input
										disabled={!isEditMode}
										className={
											isEditMode
												? 'about__input about__input--active'
												: 'about__input'
										}
										type='text'
										id='middlename'
										name='middlename'
										value={inputs.middlename || ''}
										onChange={handleInputChange}
									/>
								</div>

								<div className='form__group'>
									<label className='about__label' htmlFor='lastname'>
										Lastname:
									</label>
									<input
										disabled={!isEditMode}
										className={
											isEditMode
												? 'about__input about__input--active'
												: 'about__input'
										}
										type='text'
										id='lastname'
										name='lastname'
										value={inputs.lastname || ''}
										onChange={handleInputChange}
									/>
								</div>
							</>
						)}

						<div className='form__group'>
							<label className='about__label' htmlFor='birthdate'>
								Birthday:
							</label>
							<input
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								type='date'
								id='birthdate'
								name='birthdate'
								value={moment(inputs.birthdate).format('YYYY-MM-DD')}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form__group'>
							<label className='about__label' htmlFor='status'>
								Status:
							</label>
							<select
								value={inputs.status  ? inputs.status + '' : '0'}
								id='status'
								name='status'
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								onChange={handleInputChange}
							>
								<option value='0' disabled>
									...
								</option>
								<option value='1'>Single</option>
								<option value='2'>Engaged</option>
								<option value='3'>Married</option>
								<option value='4'>Separated</option>
							</select>
						</div>
					</fieldset>

					<fieldset>
						<legend>
							<span>
								<FaPhone className='about__icon' />
							</span>
							Contact Info:
						</legend>
						<div className='form__group'>
							<label className='about__label' htmlFor='email'>
								Email:
							</label>
							<input
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								type='email'
								id='email'
								name='email'
								value={inputs.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form__group'>
							<label className='about__label' htmlFor='phone'>
								Phone:
							</label>
							<input
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								type='text'
								id='phone'
								name='phone'
								placeholder='add phone'
								value={inputs.phone || ''}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form__group'>
							<label className='about__label' htmlFor='address'>
								Address:
							</label>
							<input
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								type='text'
								id='address'
								name='address'
								placeholder='add address'
								value={inputs.address || ''}
								onChange={handleInputChange}
							/>
						</div>
					</fieldset>

					<fieldset>
						<legend>
							<span>
								<FaGraduationCap className='about__icon' />
							</span>
							Education:
						</legend>
						<div className='form__group'>
							<label className='about__label' htmlFor='elemSchool'>
								Elementary School:
							</label>
							<input
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								type='text'
								id='elemSchool'
								name='elementary'
								placeholder='add school'
								value={
									inputs.school && inputs.school.elementary
										? inputs.school.elementary
										: ''
								}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form__group'>
							<label className='about__label' htmlFor='highSchool'>
								High School:
							</label>
							<input
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								type='text'
								id='highSchool'
								name='highschool'
								placeholder='add school'
								value={
									inputs.school && inputs.school.highschool
										? inputs.school.highschool
										: ''
								}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form__group'>
							<label className='about__label' htmlFor='college'>
								College:
							</label>
							<input
								disabled={!isEditMode}
								className={
									isEditMode
										? 'about__input about__input--active'
										: 'about__input'
								}
								type='text'
								id='college'
								name='college'
								placeholder='add college'
								value={
									inputs.school && inputs.school.college
										? inputs.school.college
										: ''
								}
								onChange={handleInputChange}
							/>
						</div>
					</fieldset>
				</div>

				<fieldset className='bio'>
					<legend>
						<span>
							<FaInfoCircle className='about__icon' />
						</span>
						Bio:
					</legend>

					<textarea
						spellCheck='false'
						className={
							isEditMode ? 'about__textarea--active' : 'about__textarea'
						}
						value={inputs.bio || ''}
						name='bio'
						disabled={!isEditMode}
						onChange={handleInputChange}
					></textarea>
				</fieldset>
			</form>
		</div>
	);
};
export default About;
