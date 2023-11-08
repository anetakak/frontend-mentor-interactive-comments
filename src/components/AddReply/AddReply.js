import AddComment from "../AddComment/AddComment";
import classes from './AddReply.module.css'

const AddReply = ({...props}) => {
	return (
		<div className={classes['add-reply']}>
			<div className={classes.line}></div>
			<AddComment {...props} />
		</div>
	);
};
export default AddReply;
