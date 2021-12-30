import style from './IconButtom.module.scss';
import {NavLink} from "react-router-dom";

let IconButtom = (props) => {
    return (
        <div className={style.btn} >
            <div  className ={style.navlink}>
                <img src={props.icon} alt="icon"/>
                <div className={style.title}>{props.title}</div>
            </div>

        </div>
    )
}

export default IconButtom;