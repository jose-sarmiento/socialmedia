import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { 
	Header,
	LeftSide,
	Timeline,
	Messenger,
	Loader
} from '../components'
import {useSelector} from "react-redux"

const HomeScreen = () => {
	const users = useSelector(state => state.entities.users)

	if(users.loading.user) {
		return <Loader />
	}

	return (
		<>
			<div className='main-container container'>
				<Header/>

				<LeftSide />

				<div className='middle-content'>
					<Timeline />
				</div>

				<Messenger />
			</div>
		</>
	)
}

export default HomeScreen

