import React from "react"
import { ToastContainer } from 'react-toastify';
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import {ImageSlider} from "../../components"

import 'react-toastify/dist/ReactToastify.css';
import "./AppLayout.scss"

const AppLayout = ({children}) => {

    return (
    	<>
    	<ImageSlider/>
    	<ToastContainer />
        <div className="main-container container">
			<Header />

			<Sidebar />

			<div className="middle-content">
				{/*<div className="fixed-bg"></div>*/}
				{children}
			</div>
		</div>
		</>
    )
}

export default AppLayout