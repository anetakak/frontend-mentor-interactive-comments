import Comment from "../Comment/Comment";
import classes from "./Reply.module.css";

const Reply = ({ ...props }) => {
	return (
		<div className={classes.reply}>
			<div className={classes.line}></div>
			<div className={classes.comment}><Comment {...props} /></div>
		</div>
	);
};
export default Reply;
