import style from './GreenButtom.module.scss';
import {NavLink} from "react-router-dom";

let GreenButtom = () => {
    return (
        <NavLink to="/addIncome" className={style.btn}>
            +
        </NavLink>
    )
}

export default GreenButtom;