import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { 
	Header,
	LeftSide,
	Timeline,
	Messenger
} from '../components'
import { useAuthContext } from '../contexts'

const HomeScreen = () => {
	const { auth } = useAuthContext()
	const history = useHistory()

	useEffect(() => {
		if (!auth) {
			return history.push('/login')
		}
	}, [history, auth])

	if (!auth) return null

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

