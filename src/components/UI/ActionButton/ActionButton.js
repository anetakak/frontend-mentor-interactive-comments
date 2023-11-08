import classes from "./ActionButton.module.css";

const ActionButton = (props) => {
	const styles = `${props.className} + ${classes['action-btn']}`;
	return (
		<button onClick={props.onClick} className={styles}>
			{props.children}
		</button>
	);
};
export default ActionButton;
