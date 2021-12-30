import style from './TextField.module.scss';

let TextField = ({input, meta, ...props}) => {
    let haserror = meta.touched && meta.error;

    return (<div>
            <input className={style.field} placeholder={props.placeholder}  ref={props.inputRef} {...input} {...props} />
            <div className={style.errorMessage}>
                {haserror ? meta.error : null}
            </div>
        </div>

    )
}

export default TextField;