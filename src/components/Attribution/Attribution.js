import React from "react";
import classes from './Attribution.module.css'

const Attribution = () => {
	return (
		<div className={classes.attribution}>
			Challenge by{" "}
			<a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
				Frontend Mentor
			</a>
			. Coded by <a href="https://github.com/anetakak">anetakak</a>.
		</div>
	);
};

export default Attribution;