import React, { useState } from "react";

import Card from "../UI/Card/Card";

import classes from "./Comment.module.css";

import IconReply from "../UI/Icon/IconReply";
import IconDelete from "../UI/Icon/IconDelete";
import IconEdit from "../UI/Icon/IconEdit";
import ActionButton from "../UI/ActionButton/ActionButton";
import AddComment from "../AddComment/AddComment";
import Reply from "../Reply/Reply";

const Comment = (props) => {
	const [replyIsActive, setReplyIsActive] = useState(false);
	const [score, setScore] = useState(props.score);

	const plusScore = () => {
		setScore((prev) => prev + 1);
	};

	const minussScore = () => {
		if (score > 0) {
			setScore((prev) => prev - 1);
		}
	};

	const replyHandler = () => {
		setReplyIsActive(true);
	};

	const sendReplyHandler = (id, comment) => {
		props.onSendReply(id, comment);
		setReplyIsActive(false)
	};

	// console.log(props.currentUser.username);
	return (
		<>
			<Card className={classes.comment}>
				<div className={classes.header}>
					<img src={props.avatar} alt="" className={classes.img} />
					<h2 className={classes.nickname}>{props.nickname}</h2>
					<p className={classes.createdat}>{props.createdat}</p>
				</div>
				<p className={classes.content}>{props.content}</p>
				<div className={classes.score}>
					<button
						onClick={plusScore}
						className={`${classes["score-btn"]} + ${classes["plus-btn"]}`}>
						+
					</button>
					<p className={classes["score-number"]}>{score}</p>
					<button
						onClick={minussScore}
						className={`${classes["score-btn"]} + ${classes["minus-btn"]}`}>
						-
					</button>
				</div>
				{props.currentUser.username === props.nickname ? (
					<div className={classes.action}>
						<ActionButton className={classes["delete-btn"]}>
							<IconDelete /> Delete
						</ActionButton>
						<ActionButton className={classes["edit-btn"]}>
							<IconEdit /> Edit
						</ActionButton>
					</div>
				) : (
					<div className={classes.action}>
						<ActionButton
							onClick={replyHandler}
							className={classes["reply-btn"]}>
							<IconReply /> Reply
						</ActionButton>
					</div>
				)}
			</Card>
			{replyIsActive && (
				<AddComment
					currentUser={props.currentUser}
					buttonName={'reply'}
					onSend={(comment) => sendReplyHandler(props.id, comment)}
				/>
			)}
			{props.replies &&
				props.replies.map((reply) => (
					<Reply
						key={reply.id}
						nickname={reply.user.username}
						avatar={reply.user.image.png}
						content={reply.content}
						createdat={reply.createdAt}
						score={reply.score}
						currentUser={props.currentUser}
						onSendReply={(comment) => sendReplyHandler(reply.id, comment)}
					/>
				))}
		</>
	);
};

export default Comment;
