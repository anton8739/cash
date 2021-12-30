import style from './NewTransaction.module.scss'

import React, {useEffect, useRef, useState} from "react";
import NavBarBack from "../../asserts/NavBarBack/NavBarBack";
import Footer from "../../asserts/Footer/Footer/Footer";
import TextField from "../../asserts/TextField/TextField";
import YellowButtom from "../../asserts/Buttons/YellowButtom/YellowButtom";
import IconButtom from "../../asserts/Buttons/IconButton/IconButtom";
import { useNavigate } from 'react-router-dom';
import {Field, formValueSelector, reduxForm,change } from "redux-form";
/* icons*/
import icon1 from '../../../static/img/categoryIcon/akar-icons_phone.svg';
import icon2 from '../../../static/img/categoryIcon/ant-design_home-outlined.svg';
import icon3 from '../../../static/img/categoryIcon/bx_bx-drink.svg';
import icon4 from '../../../static/img/categoryIcon/bytesize_gift.svg';
import icon5 from '../../../static/img/categoryIcon/cil_car-alt.svg';
import icon6 from '../../../static/img/categoryIcon/cil_taxi.svg';
import icon7 from '../../../static/img/categoryIcon/clarity_shopping-cart-line.svg';
import icon8 from '../../../static/img/categoryIcon/fluent_animal-cat-28-regular.svg';
import icon9 from '../../../static/img/categoryIcon/ic_baseline-sports-handball.svg';
import icon10 from '../../../static/img/categoryIcon/ic_outline-directions-railway-filled.svg';
import icon11 from '../../../static/img/categoryIcon/la_tshirt.svg';
import icon12 from '../../../static/img/categoryIcon/mdi_toothbrush-paste.svg';
import icon13 from '../../../static/img/categoryIcon/ph_fork-knife.svg';
import icon14 from '../../../static/img/categoryIcon/uil_bill.svg';

import deleteBtn from '../../../static/img/svg/feather_delete.svg';
import {dateToString, getCurrentDate} from "../../../utils/utils";
import {useMutation, useQuery} from "@apollo/client";
import {GET_EXPERSE_BY_DATE} from "../../../query/experse";
import {CREATE_EXPERSE} from "../../../migrations/experse";
import {math, maxLength20, required} from "../../../utils/formValidators";
import {connect} from "react-redux";






const selector = formValueSelector('transaction');
const mapStateToProps = (state) => {
    return {
        transaction: selector(state, 'transaction'),
        intervalType : state.main. intervalType,
        currentInterval : state.main. currentInterval,
        auth : state.auth.auth
    }

}
let mapDispatchToProps =  (dispatch) => {
    return {

        changeFieldValue:(form, field, value) => {
            dispatch(change(form, field, value))
        }
    }
}




let NewTransaction = (props) => {
    let [state, setState] = useState({
        sumEntered: false,
        sum : null,
        category : null,
        date : dateToString(new Date()),
        hasError : false
    });
    let inputRef = useRef();
    let formTransaction = useRef();
    let transaction = useRef();
    let navigate = useNavigate();
    const [newExperse] = useMutation(CREATE_EXPERSE)
    if(props.intervalType == "day" && state.date !=props.currentInterval) {

        setState({...state, date: props.currentInterval})
    }
    let numberButtonPress = (number) => {

        if(!props.transaction) {
            if (number != -1) {
                props.changeFieldValue('transaction', 'transaction', `${number}`)

            }
        } else {
            if (number != -1) {
                props.changeFieldValue('transaction', 'transaction', `${props.transaction}${number}`)
            } else  {
                props.changeFieldValue('transaction', 'transaction', props.transaction.substr(0,props.transaction.length-1))
            }
        }
    }
    useEffect(()=> {
        inputRef.current.addEventListener('focus', function(e) {
            e.preventDefault();
            console.log("adone")
        });
    }, [])
    useEffect(()=> {

    }, [props.transaction])
    useEffect(() => {

        if(state.category) {

            setState({...state, category: null})
            let id =new Date().getTime()
            let date = state.date
            let userId = props.auth.id
            let category =state.category
            let sum = state.sum
            newExperse({
                variables: {
                    input: {
                        id, userId, date, category, sum
                    }
                }
            })
            navigate("/");
        }
    }, [state.category])

    function handleSubmit(e) {

            console.log(transaction.current.props._reduxForm)
            if (transaction.current.props._reduxForm.valid ) {
                if (props.type =="income"){

                    let id =new Date().getTime()
                    let date = state.date
                    let category = '-1'
                    let userId = props.auth.id
                    let sum = inputRef.current.value
                    newExperse({
                        variables: {
                            input: {
                                id,userId,date, category, sum
                            }
                        }
                    })
                    navigate("/");
                } else  {
                    setState({...state, sumEntered: true, sum: inputRef.current.value})
                    inputRef.current.disabled = true;
                }


            } else {

            }

        console.log(props.transaction)
        console.log("submit")
    }

    return (
        <form  ref={formTransaction} onSubmit={ handleSubmit} >
            <NavBarBack/>
            <div className={style.content}>
                <div className={style.wrapper}>


                    <div className={style.title}>
                        {state.date}
                    </div>
                    <div className={props.type =="income" ?  style.textFieldGreen: style.textFieldRed}>
                        <Field
                            name="transaction"
                            ref={transaction}
                            validate={[required,maxLength20,math]}
                            component={TextField}
                            type="text"
                            placeholder="Введите сумму..."
                            inputRef={inputRef}
                        ></Field>
                    </div>
                    {state.sumEntered ? <div className={style.iconTabs}>


                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "0"})

                        }}>
                            <IconButtom title="Телефон" icon={icon1}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "1"})

                        }}>
                            <IconButtom title="Дом" icon={icon2}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "2"})

                        }}>
                            <IconButtom title="Развлечения" icon={icon3}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "3"})

                        }}>
                            <IconButtom title="Подарки" icon={icon4}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "4"})

                        }}>
                            <IconButtom title="Машина" icon={icon5}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "5"})

                        }}>
                            <IconButtom title="Такси" icon={icon6}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "6"})

                        }}>
                            <IconButtom title="Магазин" icon={icon7}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "7"})

                        }}>
                            <IconButtom title="Питомцы" icon={icon8}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "8"})

                        }}>
                            <IconButtom title="Спорт" icon={icon9}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "9"})

                        }}>
                            <IconButtom title="Транспорт" icon={icon10}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "10"})

                        }}>
                            <IconButtom title="Одежда" icon={icon11}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "11"})

                        }}>
                            <IconButtom title="Гигиена" icon={icon12}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "12"})

                        }}>
                            <IconButtom title="Ресторан" icon={icon13}/>
                        </div>
                        <div className={style.iconTabItem} onClick={() => {
                            setState({...state, category: "13"})

                        }}>
                            <IconButtom title="Счета" icon={icon14}/>
                        </div>

                    </div> : <>
                        <div className={style.tabs}>
                            <div className={style.tabItem} onClick={() => numberButtonPress(1)}>
                                <YellowButtom text="1"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(2)}>
                                <YellowButtom text="2"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(3)}>
                                <YellowButtom text="3"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress('+')}>
                                <YellowButtom text="+"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(4)}>
                                <YellowButtom text="4"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(5)}>
                                <YellowButtom text="5"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(6)}>
                                <YellowButtom text="6"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress('-')}>
                                <YellowButtom text="-"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(7)}>
                                <YellowButtom text="7"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(8)}>
                                <YellowButtom text="8"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress(9)}>
                                <YellowButtom text="9"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress('*')}>
                                <YellowButtom text="*"/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress('.')}>
                                <YellowButtom text="."/></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress('0')}>
                                <YellowButtom text="0"/></div>
                            <div className={style.tabItem} onClick={() => {}}  onClick={() => numberButtonPress(-1)}>
                                <YellowButtom text={<img src={deleteBtn} alt="del"/>}
                                /></div>
                            <div className={style.tabItem} onClick={() => numberButtonPress('/')}>
                                <YellowButtom text="/"/>
                            </div>
                        </div>
                        <div className={style.categoryBtn} onClick={() => {
                            formTransaction.current.dispatchEvent(new Event('submit', {
                                'bubbles'    : true, // Whether the event will bubble up through the DOM or not
                                'cancelable' : true  // Whether the event may be canceled or not
                            }))
                        }}>
                            <YellowButtom text={props.type =="income" ? "Добавить Доход" : "Выбор категории"}/>
                        </div>
                    </>}


                </div>
            </div>
            <Footer/>
        </form>
    )

}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'transaction',
    touchOnChange: true
})(NewTransaction));