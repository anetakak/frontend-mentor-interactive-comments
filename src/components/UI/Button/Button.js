import classes from './Button.module.css'

const Button = (props) => {
    const styles = `${props.className} + ${classes.button}`
    return <button onClick={props.onClick} className={styles}>{props.children}</button>
}
export default Button;