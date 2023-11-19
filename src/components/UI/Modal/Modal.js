import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import classes from "./Modal.module.css";

const Modal = (props) => {
	const Backdrop = (props) => {
		return <div className={classes.modal}></div>;
	};
	const ModalOverlay = () => {
		return (
			<div className={classes["modal-box"]}>
				<h2 className={classes.heading}>Delete comment</h2>
				<p className={classes.message}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className={classes['btn-box']}>
				<Button onClick={props.cancelHandler} className={classes['cancel-btn']}>no, cancel</Button>
				<Button onClick={props.onConfirm} className={classes['delete-btn']}>yes, delete</Button>
                </div>
			</div>
		);
	};
	return (
		<React.Fragment>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<ModalOverlay />, document.getElementById('overlay-root'))}
        </React.Fragment>
	);
};

export default Modal;
