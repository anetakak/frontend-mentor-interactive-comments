import React, { useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./AddComment.module.css";
import Button from "../UI/Button/Button";

const AddComment = (props) => {
	let replyingTo
	if (props.replyingTo) {
		replyingTo = '@' + props.replyingTo
	} else {
		replyingTo = ''
	}

	const [comment, setComment] = useState(replyingTo)
	const currentUser = props.currentUser;
	const currentUserAvatar = currentUser.image.png;
	const id = Math.random() * 1000;


	const clickHandler = () => {
		if (props.replyingTo) {
			if (comment.startsWith(replyingTo) && comment.slice(replyingTo.length).trim().length > 0) {
				props.onSend({
					"id": id,
					"content": comment.slice(replyingTo.length),
					"createdAt": "now",
					"score": 0,
					"user": {...currentUser},
					"replyingTo": props.replyingTo
				  })
				setComment('')
			} else if (comment.startsWith(replyingTo) && comment.slice(replyingTo.length).trim().length <= 0) {
				console.log('dodaj treść komentarza!');
			} else if (comment.trim().length > 0) {
				props.onSend({
					"id": id,
					"content": comment,
					"createdAt": "now",
					"score": 0,
					"user": {...currentUser},
					"replyingTo": props.replyingTo
				  })
				setComment('')
			}
		}  else if (comment.trim().length > 0) {
			props.onSend({
				"id": id,
				"content": comment,
				"createdAt": "now",
				"score": 0,
				"user": {...currentUser}
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
			<Button className={classes['send-btn']} onClick={clickHandler}>{props.buttonContent}</Button>
		</Card>
	);
};

export default AddComment;
