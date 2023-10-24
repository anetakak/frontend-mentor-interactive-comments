import React from "react";

import Card from "../UI/Card/Card";

import classes from "./Comment.module.css";

import reply from "../../images/icon-reply.svg";

const Comment = (props) => {
	return (
		<Card className={classes.comment}>
			<div className={classes.header}>
				<img src={props.avatar} alt="" className={classes.img} />
				<h2 className={classes.nickname}>{props.nickname}</h2>
				<p className={classes.createdat}>{props.createdat}</p>
			</div>
			<p className={classes.content}>{props.content}</p>
			<div className={classes.score}>
				<button className={`${classes['score-btn']} + ${classes['plus-btn']}`}>+</button>
				<p className={classes["score-number"]}>{props.score}</p>
				<button className={`${classes['score-btn']} + ${classes['minus-btn']}`}>-</button>
			</div>
			<button className={classes.reply}>
				<img src={reply} alt="" />
				Reply
			</button>
		</Card>
	);
};

export default Comment;
