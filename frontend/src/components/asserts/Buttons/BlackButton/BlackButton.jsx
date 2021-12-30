import style from './BlackButton.module.scss';

let BlackButton = (props) => {
    return (
        <div className={style.btn}>
            {props.text}
        </div>
    )
}

export default BlackButton;