import React from "react"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"

import "./AppLayout.scss"

const AppLayout = ({children}) => {

    return (
        <div className="main-container container">
			<Header />

			<Sidebar />

			<div className="middle-content">
				{children}
			</div>
		</div>
    )
}

export default AppLayout