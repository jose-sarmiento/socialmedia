import React from "react"
import Header from "./Header"
import LeftSide from "./LeftSide"
import Messenger from "./Messenger"

const AppLayout = ({children}) => {

    return (
        <div className="main-container container">
			<Header />

			<LeftSide />

			<div className="middle-content">
				{children}
			</div>

			<Messenger />
		</div>
    )
}

export default AppLayout