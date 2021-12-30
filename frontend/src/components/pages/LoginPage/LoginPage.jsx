import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import style from './LoginPage.module.scss'
import Logo from "../../asserts/Logo/Logo";
import TextField from "../../asserts/TextField/TextField";
import YellowButtom from "../../asserts/Buttons/YellowButtom/YellowButtom";
import BlackButton from "../../asserts/Buttons/BlackButton/BlackButton";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {loginValidator, math, maxLength20, passwordValidator, required} from "../../../utils/formValidators";
import {useMutation, useQuery} from "@apollo/client";
import {GET_AUTH, VALIDATE_TOKEN} from "../../../query/experse";
import {connect} from "react-redux";
import {setAuth} from "../../../redux/reducers/authReducer";
import Cookies from 'universal-cookie';
import {CREATE_USER} from "../../../migrations/experse";

const cookies = new Cookies();


const selector = formValueSelector('login');
const mapStateToProps = (state) => {
    return {
        login: selector(state, 'login'),
        password: selector(state, 'password'),
        token: state.auth.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    }

}


const LoginPage = (props) => {
    const navigate = useNavigate();
    let [state, setState] = useState({
        username: null,
        password: null,
        regUserName: null,
        regPassword: null,
        loginError: "",
        regStatus: false
    });
    let formTransaction = useRef();
    let login = useRef();
    let password = useRef();
    let inputRef = useRef();
    const [newUser] = useMutation(CREATE_USER, {
        variables: {
            username: state.regUserName,
            password: state.regPassword
        }
    })
    const {data: userData, loading: loading, refetch: refetch} = useQuery(GET_AUTH, {
        variables: {
            username: state.username,
            password: state.password
        }
    })
    useEffect(() => {
        let onEnterPress = (e) => {
            if (e.key == "Enter") {
                formTransaction.current.dataset.type = "login"
                formTransaction.current.dispatchEvent(new Event('submit', {
                    'bubbles': true, // Whether the event will bubble up through the DOM or not
                    'cancelable': true  // Whether the event may be canceled or not
                }))
            }
        }
        document.addEventListener('keydown', onEnterPress );
      return  () => {
          document.removeEventListener('keydown', onEnterPress );
      }
    }, [])
    useEffect(() => {
        if (props.isAuthenticated) {
            navigate('/')
        }
    }, [props.isAuthenticated])
    useEffect(() => {
        if (cookies.get('auth')) {
            navigate('/')
        }
    }, [cookies.get('auth')])

    useEffect(async () => {
        if (state.username && state.password) {
            try {
                let response = await refetch()
                let auth = response.data.getAuth
                cookies.set('auth', auth, {path: '/'})
                props.setAuth({
                    auth: auth,
                    isAuthenticated: true,
                })
            } catch (e) {
                setState({
                    ...state,
                    loginError: "Пользователь с таким логином не существует, пожалуйста зарегестируйтесь!"
                })
            }
        }
    }, [state.username, state.password])
    useEffect(async () => {
        if (state.regUserName && state.regPassword) {
            let username = state.regUserName
            let password = state.regPassword
            try {
                let response = await newUser({
                    variables: {
                        input: {
                            username: username, password: password
                        }
                    }
                })
                let auth = response.data.createUser
                cookies.set('auth', auth, {path: '/'})
                navigate("/welcom")
                props.setAuth({
                    auth: auth,
                    isAuthenticated: true,
                })
            } catch (e) {
                console.log(e)
                setState({...state, loginError: "Пользователь с таким логином уже существует"})
            }


        }
    }, [state.regUserName, state.regPassword])

    function continueHandler() {
        navigate('/')
    }

    function submitHandler(e) {

        if (login.current.props._reduxForm.valid && password.current.props._reduxForm.valid && e.target.dataset.type == "login") {
            setState({
                ...state, username: props.login,
                password: props.password
            })

        }
        if (login.current.props._reduxForm.valid && password.current.props._reduxForm.valid && e.target.dataset.type == "reg") {
            setState({
                ...state, regUserName: props.login,
                regPassword: props.password
            })
        }
    }

    return (
        <form ref={formTransaction} className={style.page} onSubmit={submitHandler} data-type="">

            <div className={style.cart}>
                <div className={style.logo}>
                    <Logo/>
                </div>
                <div className={style.text}>
                    Добро пожаловать!
                    Cash - бесплатное приложения для учета личных финансов.
                    Ведите свой бюджет и откладывайте деньги с умом!
                </div>
                <div className={style.field}>
                    <Field
                        name="login"
                        ref={login}
                        validate={[required, maxLength20, loginValidator]}
                        component={TextField}
                        type="text"
                        placeholder="Введите имя пользователя"
                        inputRef={inputRef}></Field>
                </div>
                <div className={style.field}>
                    <Field
                        name="password"
                        ref={password}
                        validate={[required, maxLength20, passwordValidator]}
                        component={TextField}
                        type="password"
                        placeholder="Введите пароль"
                        inputRef={inputRef}></Field>
                </div>
                <div className={style.errors}>
                    {state.loginError}
                </div>
                <div className={style.btnBar}>
                    <div onClick={() => {
                        formTransaction.current.dataset.type = "login"
                        formTransaction.current.dispatchEvent(new Event('submit', {
                            'bubbles': true, // Whether the event will bubble up through the DOM or not
                            'cancelable': true  // Whether the event may be canceled or not
                        }))
                    }}>
                        <YellowButtom text="Вход"/>
                    </div>

                    <div onClick={() => {
                        formTransaction.current.dataset.type = "reg"
                        formTransaction.current.dispatchEvent(new Event('submit', {
                            'bubbles': true, // Whether the event will bubble up through the DOM or not
                            'cancelable': true  // Whether the event may be canceled or not
                        }))
                    }}>
                        <YellowButtom text="Регистрация"/>
                    </div>
                </div>
            </div>


        </form>)
}
export default connect(mapStateToProps, {setAuth})(reduxForm({
    form: 'login', // a unique identifier for this form
})(LoginPage));