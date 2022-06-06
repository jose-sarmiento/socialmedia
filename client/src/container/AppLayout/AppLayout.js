import React from "react"
import { ToastContainer } from 'react-toastify';
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import { ImageSlider, CreatePostModal } from "../../components"

import 'react-toastify/dist/ReactToastify.css';
import "./AppLayout.scss"

const AppLayout = ({children, page}) => {

    return (
    	<>
    	<ImageSlider/>
    	<ToastContainer />
    	<CreatePostModal />
        <div className="main-container container">
			<Header />

			<Sidebar />

			<div className={page === "homepage" ? "middle-content middle-content--homepage" : "middle-content"}>
				{/*<div className="fixed-bg"></div>*/}
				{children}
			</div>
		</div>
		</>
    )
}

export default AppLayout