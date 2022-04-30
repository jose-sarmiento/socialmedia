import React from 'react'
import { Header, LeftSide, Messenger, Friends } from '../components'

const FriendsScreen = () => {

	return (
		<>
			<div className='main-container container'>
				<Header />
				<LeftSide />
				<div className='middle-content'>
					<Friends />
				</div>

				<Messenger />
			</div>
		</>
	)
}

export default FriendsScreen
