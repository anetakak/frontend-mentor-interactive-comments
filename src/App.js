import React, { useState, useEffect } from "react";
import "./App.css";
import Attribution from "./components/Attribution/Attribution";
import Comment from "./components/Comment/Comment";
import AddComment from "./components/AddComment/AddComment";
import Modal from "./components/UI/Modal/Modal";
import CommentArea from "./components/CommentArea/CommentArea";

function App() {
	const [comments, setComments] = useState({
		currentUser: {
			image: {
				png: "./images/avatars/image-juliusomo.png",
				webp: "./images/avatars/image-juliusomo.webp",
			},
			username: "juliusomo",
		},
		comments: [
			{
				id: 1,
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				score: 12,
				user: {
					image: {
						png: "./images/avatars/image-amyrobson.png",
						webp: "./images/avatars/image-amyrobson.webp",
					},
					username: "amyrobson",
				},
				replies: [],
			},
			{
				id: 2,
				content:
					"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
				createdAt: "2 weeks ago",
				score: 5,
				user: {
					image: {
						png: "./images/avatars/image-maxblagun.png",
						webp: "./images/avatars/image-maxblagun.webp",
					},
					username: "maxblagun",
				},
				replies: [
					{
						id: 3,
						content:
							"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
						createdAt: "1 week ago",
						score: 4,
						replyingTo: "maxblagun",
						user: {
							image: {
								png: "./images/avatars/image-ramsesmiron.png",
								webp: "./images/avatars/image-ramsesmiron.webp",
							},
							username: "ramsesmiron",
						},
					},
					{
						id: 4,
						content:
							"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
						createdAt: "2 days ago",
						score: 2,
						replyingTo: "ramsesmiron",
						user: {
							image: {
								png: "./images/avatars/image-juliusomo.png",
								webp: "./images/avatars/image-juliusomo.webp",
							},
							username: "juliusomo",
						},
					},
				],
			},
		],
	});

	const currentUser = comments.currentUser;

	const idComments = comments.comments.map((comment) => comment.id);
	const idReplies = comments.comments.map((comment)=> comment.replies.map((reply) => reply.id))
	const idArray = idComments.concat(...idReplies);

	const currentId =  Math.max(...idArray) + 1;

	const sendHandler = (comment) => {
		setComments((prevComments) => ({
			currentUser: prevComments.currentUser,
			comments: [...prevComments.comments, {id: currentId, ...comment}],
		}));
	};

	const sendReplyHandler = (currentCommentId, comment) => {
		// console.log(id, comment);
		// const currentCommentIndex = comments.comments.findIndex(comment => comment.id === currentCommentId);
		// console.log(`odpowiedz do: ${currentCommentIndex}`);
		const commentWithId = {id: currentId, ...comment}
		const commentToReply = comments.comments.filter((comment) => comment.id === currentCommentId)
		commentToReply[0].replies = commentToReply[0].replies.concat(commentWithId);
		console.log(...commentToReply);

		setComments((prevComments) => ({
			currentUser: prevComments.currentUser,
			comments: [...commentToReply, ...prevComments.comments.filter((comment) => comment.id !== currentCommentId)]
			}))
	}
	console.log(comments);


	return (
		<div className="container">
			{comments.comments.map((comment) => (
				<Comment
					key={comment.id}
					id={comment.id}
					nickname={comment.user.username}
					avatar={comment.user.image.png}
					content={comment.content}
					createdat={comment.createdAt}
					score={comment.score}
					currentUser={currentUser}
					replies={comment.replies}
					onSendReply={sendReplyHandler}
				/>
			))}
			{/* {comments.comments.map((comment) => (
				<Comment
					key={comment.id}
					nickname={comment.user.username}
					avatar={comment.user.image.png}
					content={comment.content}
					createdat={comment.createdAt}
					score={comment.score}
					currentUser={currentUser}
					replies={comment.replies}
				/>
			))} */}
			<AddComment
				// avatar={avatar}
				currentUser={currentUser}
				onSend={sendHandler}
				idArray={idArray}
				buttonName={'send'}
			/>
			<Attribution />
		</div>
	);
}

export default App;
