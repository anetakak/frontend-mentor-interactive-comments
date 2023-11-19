import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import classes from "./EditingArea.module.css";

const EditingArea = (props) => {
	const textareaRef = useRef();
	const [height, setHeight] = useState(0);
	const [editedComment, setEditedComment] = useState(props.replyingTo + props.content)

	useEffect(() => {
		const scrollHeight = textareaRef.current.scrollHeight;
		setHeight(scrollHeight + 2);
	}, []);

	const changeHandler = (event) => {
		setEditedComment(event.target.value)
	};

	const updateComment = () => {
		if (editedComment.startsWith(props.replyingTo)) {
			props.onUpdate(editedComment.slice(props.replyingTo.length))
		} else {
			props.onUpdate(editedComment)
		}
	}

	return (
		<>
		<textarea
			className={classes.textarea}
			style={{ height: height + "px" }}
			name="content"
			id="content"
			value={editedComment}
			onChange={changeHandler}
			ref={textareaRef}
		/>
		<Button className={classes["update-btn"]} onClick={updateComment}>update</Button>
							</>
	);
};
export default EditingArea;
