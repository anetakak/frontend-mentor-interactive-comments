import React, { useState } from "react";

import Card from "../UI/Card/Card";
import currentUserAvatar from "../../images/avatars/image-amyrobson.png";
import classes from "./AddComment.module.css";
import Button from "../UI/Button/Button";

const currentUser = JSON.parse(localStorage.getItem("user"));

const AddComment = (props) => {
	const [comment, setComment] = useState('')
	const id = Math.max(...props.idArray)


	const clickHandler = () => {
		if (comment.trim().length > 0) {
			props.onSend({
				"id": id + 1,
				"content": comment,
				"createdAt": "now",
				"score": 0,
				"user": {...currentUser},
				"replies": []
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
			<Button className={classes['send-btn']} onClick={clickHandler}>send</Button>
		</Card>
	);
};

export default AddComment;
