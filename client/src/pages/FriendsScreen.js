import React from 'react'
import { Header, LeftSide, Messenger, Loader, Friends }from '../components'

import { useUsersContext } from '../contexts'

const FriendsScreen = () => {
	const { friends, friendRequests, people } = useUsersContext()

  return (
  	<>
  	<div className='main-container container'>
			<Header />
			<LeftSide />
			<div className='middle-content'>
		  	<Friends
		  		friends={friends}
		  		friendRequests={friendRequests}
		  		people={people}
		  	/> 
		  </div>

			<Messenger />
		</div>
    </>
  )
}

export default FriendsScreen
