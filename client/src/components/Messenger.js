import React from 'react'
import {FaSearch, FaFacebookMessenger} from 'react-icons/fa'
import Chat from './Chat'

const Messenger = () => {
	return (
		<div className="messenger">
			<section className="messenger__header">
				<FaFacebookMessenger className="messenger__icon" />
				<h3 className="messenger__heading">Messenger</h3>
			</section>

			<div className="messenger__buttons">
				<button className="messenger__button messenger__button--chats messenger__button--active">
					Chats
				</button>
				<button className="messenger__button messenger__button--actives messenger__button">
					Active
				</button>
			</div>

			<div className="messenger__chats">
				<Chat />
				<Chat />
				<Chat seen={false} />
			</div>
			<div className="messenger__footer">
				<form className="messenger__search-form">
					<label
						htmlFor="messenger__search"
						className="messenger__search-label">
						<FaSearch />
					</label>
					<input
						type="text"
						id="messenger__search"
						className="messenger__search"
					/>
				</form>
			</div>
		</div>
	)
}

export default Messenger