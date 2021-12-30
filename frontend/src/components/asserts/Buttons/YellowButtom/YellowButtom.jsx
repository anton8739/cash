import style from './YellowButtom.module.scss';

let YellowButtom = (props) => {
    return (
        <div className={style.btn}>
            {props.text}
        </div>
    )
}

export default YellowButtom;