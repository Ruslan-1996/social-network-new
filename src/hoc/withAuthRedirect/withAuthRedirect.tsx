import React from 'react'
import {connect} from "react-redux";
import {selectIsAuth} from "../../store/authSelector";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../store/store";

const withAuthRedirect = (Component: any) => {

    const ContainerComponent = (props: any) => {

        return (
            <>
                {props.isAuthUser
                    ? <Component {...props}/>
                    : <Redirect to='/login'/>}
            </>
        )
    }

    const mapStateToProps = (state:AppStateType) => {
        return {
            isAuthUser: selectIsAuth(state)
        }
    }

    return connect(mapStateToProps, {})(ContainerComponent)
}

export default withAuthRedirect