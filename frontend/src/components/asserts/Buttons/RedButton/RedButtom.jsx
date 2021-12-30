import style from './RedButtom.module.scss';
import {NavLink} from "react-router-dom";

let RedButtom = () => {
    return (
        <NavLink to="/addExperse" className={style.btn} onClick={() => console.log("+")} >
            -
        </NavLink>
    )
}

export default RedButtom;