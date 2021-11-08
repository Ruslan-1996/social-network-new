import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileStatus.module.css'

type propsType = {
    isMeProfile: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<propsType> = (props) => {

    const [status, setStatus] = useState(props.status)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activeEditMode = () => {
        setEditMode(true)
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    const updateStatus = () => {
        if(props.status !== status) {
            props.updateStatus(status)
            setStatus(props.status)
        }
        setEditMode(false)
    }

    return (
        <div className={s.wrapper}>
            {props.isMeProfile ?
                (!editMode ?
                        <span onDoubleClick={activeEditMode} onTouchStart={activeEditMode}>{props.status ? props.status : 'Введите статус'}</span>
                        : <>
                            <input type="text" value={status} onChange={changeStatus}/>
                            <button onClick={updateStatus}>ok</button>
                        </>
                )
                : <span>{props.status ? props.status : 'Нет статуса'}</span>
            }
        </div>
    );
}


export default ProfileStatus;
