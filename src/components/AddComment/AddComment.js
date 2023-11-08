import React, { useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./AddComment.module.css";
import Button from "../UI/Button/Button";

const AddComment = (props) => {
	const [comment, setComment] = useState('')
	const currentUser = props.currentUser
	const currentUserAvatar = currentUser.image.png


	const clickHandler = () => {
		if (comment.trim().length > 0) {
			props.onSend({
				"content": comment,
				"createdAt": "now",
				"score": 0,
				"user": {...currentUser},
				// "replies": []
			  })
			setComment('')
		}
	}
	const changeHandler = (event) => {
		setComment(event.target.value)
	}

	return (
		<Card className={classes["add-comment"]}>
			<img src={currentUserAvatar} alt="" className={classes.img} />
			<textarea
				className={classes.textarea}
				name="message"
				placeholder="Add a comment..."
				id="message"
				value={comment}
				onChange={changeHandler}></textarea>
			<Button className={classes['send-btn']} onClick={clickHandler}>{props.buttonName}</Button>
		</Card>
	);
};

export default AddComment;
