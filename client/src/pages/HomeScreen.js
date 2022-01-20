import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { 
	Header,
	LeftSide,
	Timeline,
	Messenger,
	Loader
} from '../components'
import { useUsersContext } from '../contexts'

const HomeScreen = () => {
	const { loadingUser } = useUsersContext()

	if(loadingUser) {
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

