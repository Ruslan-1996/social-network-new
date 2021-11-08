import { Field, Form } from "react-final-form"
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/authReducer";
import { userLoginDataType } from "../../api/api";
import { FieldCreatorCheckbox, FieldCreator } from "../common/FieldCreator/FieldCreator";
import { required } from "../../utils/validators/validators";
import { selectCaptcha, selectErrorMessage, selectIsAuth } from "../../store/authSelector";
import s from './Login.module.css'
import { Redirect } from "react-router-dom";
import { useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import iphone from '../../static/iphone.png';
import android from '../../static/android.png'

const Login = () => {

  const [typePasswordEditMode, setTypePasswordEditMode] = useState<boolean>(true)

  const errorMessage = useSelector(selectErrorMessage)
  const captcha = useSelector(selectCaptcha)
  const authUser = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  let onSubmit = (value: userLoginDataType) => {
    dispatch(userLogin(value))
  }

  if (authUser) {
    return <Redirect to='profile'/>
  }

  const onTogglePassword = () => {
    setTypePasswordEditMode(prevState => !prevState)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.mobileInfo}>
        <div className={s.mobileImages}>
          <div className={s.mobileInfoItem}>
            <img src={iphone} alt="iphone"/>
          </div>
          <div className={s.mobileInfoItem}>
            <img src={android} alt="android"/>
          </div>
        </div>
        <div className={s.mobileInfoTitle}>Use our social network on mobile devices.</div>
      </div>
      <div>
        <Form
          onSubmit={onSubmit}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <h2>Log In</h2>
              <div className={s.inputBlock}>
                <Field name="email" component={FieldCreator} validate={required} typeField={"input"}
                       placeholder="email"/>
              </div>
              <div className={cn(s.inputBlock, s.passwordBlock)}>
                <Field name="password" component={FieldCreator} typeField={"input"}
                       type={typePasswordEditMode ? "password" : "text"}
                       placeholder="password" style={{paddingRight: '35px'}}/>
                <div className={s.changeTypePassword} onClick={onTogglePassword}>
                  {typePasswordEditMode ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
                </div>
              </div>
              <div className={s.inputCheckbox}>
                <Field name="rememberMe" component={FieldCreatorCheckbox} typeField={"input"} type="checkbox"/>
                <div className={s.inputCheckboxTitle}>remember me</div>
              </div>
              {captcha && (
                <div className={s.inputBlock}>
                  <div>
                    <img src={captcha} alt=""/>
                  </div>
                  <Field name='captcha' component={FieldCreator} typeField={"input"}/>
                </div>
              )}
              {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
              <button type="submit" className={s.button}>Log In</button>
            </form>
          )}
        />
        <div className={s.logUp}>
          Don't have an account? <a href="https://social-network.samuraijs.com/signUp" target='_blank'
                                    rel="noopener noreferrer">Sign up</a>
        </div>
      </div>
    </div>
  )
}

export default Login