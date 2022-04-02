import React from 'react'

const CircleImage = ({children, size="sm"}) => {
	return (
		<figure className={size === "sm" ? "circle-image" : "circle-image circle-image--big"}>
			{children}
		</figure>
	)
}

export default CircleImage