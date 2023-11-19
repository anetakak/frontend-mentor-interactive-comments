import React, { useState } from "react";

import Card from "../UI/Card/Card";
import IconReply from "../UI/Icon/IconReply";
import IconDelete from "../UI/Icon/IconDelete";
import IconEdit from "../UI/Icon/IconEdit";
import IconPlus from "../UI/Icon/IconPlus";
import IconMinus from "../UI/Icon/IconMinus";
import ActionButton from "../UI/ActionButton/ActionButton";
import AddComment from "../AddComment/AddComment";
import EditingArea from "../UI/EditingArea/EditingArea";
import Modal from "../UI/Modal/Modal";
import Reply from "../Reply/Reply";

import classes from "./Comment.module.css";

const Comment = (props) => {
	const [score, setScore] = useState(props.score);
	const [replies, setReplies] = useState(props.replies);
	const [replyIsActive, setReplyIsActive] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState(props.content);
	const [showModal, setShowModal] = useState(false);
	const [confirmedDelete, setConfirmedDelete] = useState(false);
	
	// const replyingTo = "@" + props.replyingTo + " ";
	let commentContent
	if (props.replyingTo) {
		commentContent = <><span className={classes['replying-to']}>@{props.replyingTo} </span>{content}</>
	} else {
		commentContent = content
	}

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

	const sendReplyHandler = (comment) => {
		if (replies) {
			setReplies((prevReplies) => [...prevReplies, {...comment}]);
		} else {
			props.onSendReply(comment);
		}
		setReplyIsActive(false);
	};

	const editHandler = () => {
		setIsEditing(true);
	};

	const updateCommentHandler = (newContent) => {
		setContent(newContent)
		setIsEditing(false);
	}
	const deleteHandler = () => {
		setShowModal(true);
	};

	if (confirmedDelete) {
		return;
	}

	return (
		<>
			{showModal && (
				<Modal
					cancelHandler={() => setShowModal(false)}
					onConfirm={() => setConfirmedDelete(true)}
				/>
			)}
			<div className={classes['comment-area']}>
				<Card className={classes.comment}>
					<div className={classes.header}>
						<img src={props.avatar} alt="" className={classes.img} />
						<h2 className={classes.nickname}>{props.nickname}</h2>
						{props.currentUser.username === props.nickname && (
							<div className={classes.you}>
								<p>you</p>
							</div>
						)}
						<p className={classes.createdat}>{props.createdat}</p>
					</div>

					{!isEditing ? (
						<p className={classes.content}>
							{commentContent}
							</p>
					) : (
						<div className={classes["edited-content"]}>
							<EditingArea
								content={content}
								replyingTo={`@${props.replyingTo} `}
								onUpdate={updateCommentHandler}
							/>
						</div>
					)}
					<div className={classes.score}>
						<button
							onClick={plusScore}
							className={`${classes["score-btn"]} + ${classes["plus-btn"]}`}>
							<IconPlus />
						</button>
						<p className={classes["score-number"]}>{score}</p>
						<button
							onClick={minussScore}
							className={`${classes["score-btn"]} + ${classes["minus-btn"]}`}>
							<IconMinus />
						</button>
					</div>
					{props.currentUser.username === props.nickname ? (
						<div className={classes.action}>
							<ActionButton
								onClick={deleteHandler}
								className={classes["delete-btn"]}>
								<IconDelete /> Delete
							</ActionButton>
							<ActionButton
								onClick={editHandler}
								className={classes["edit-btn"]}>
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
						buttonContent={"reply"}
						onSend={sendReplyHandler}
						replyingTo={props.nickname}
					/>
				)}
			</div>

			{replies &&
				replies.map((reply) => {
					if (reply !== undefined) {
						return (
							<Reply
								key={reply.id}
								id={reply.id}
								nickname={reply.user.username}
								avatar={reply.user.image.png}
								content={reply.content}
								replyingTo={reply.replyingTo}
								createdat={reply.createdAt}
								score={reply.score}
								currentUser={props.currentUser}
								onSendReply={(comment) => sendReplyHandler(comment)}
							/>
						);
					}
				})}
		</>
	);
};

export default Comment;
