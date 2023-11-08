import { useState } from "react";
import Comment from "../Comment/Comment";
import Reply from "../Reply/Reply";
import AddComment from "../AddComment/AddComment";

const CommentArea = (props) => {

    const sendReplyHandler = (comment) => {
        props.onSendReply();
    }
	return (
		<>
			<Comment
				key={props.id}
				nickname={props.nickname}
				avatar={props.avatar}
				content={props.content}
				createdat={props.createdat}
				score={props.score}
				currentUser={props.currentUser}
                onSendReply={(comment) => sendReplyHandler(comment)}
			/>
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
					/>
				))}
		</>
	);
};
export default CommentArea;
