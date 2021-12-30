import style from './NavBarBack.module.scss'
import Logo from "../Logo/Logo";
import leftBtn from '../../../static/img/arrow-left.png';
import {NavLink, useNavigate} from "react-router-dom";
let NavBarBack = () => {
    const navigate = useNavigate();

    let handleLeftBtnClick = () => {
        navigate('/')

    }


    return (
        <div className={style.nav}>
            <div className={style.leftBtn} onClick={() => handleLeftBtnClick() }>
                <img src={leftBtn} alt="leftBtn"/>
            </div>
            <NavLink to="/" className={style.logo}>
                <Logo/>
            </NavLink>
            <div className={style.text}  >
                Новый расход
            </div>

        </div>
    )
}

export default NavBarBack;