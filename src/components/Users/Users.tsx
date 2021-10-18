import React from 'react';
import s from './Users.module.css'
import { usersType } from "../../store/usersReducer";
import User from "./User/User";
import Paginator from '../common/Paginator/Paginator';
import UsersLoader from './UsersLoader/UsersLoader';

type propsType = {
  users: Array<usersType>,
  totalCount: number,
  pageSize: number,
  pageNumber: number,
  authId: number | null,
  isPreloader: boolean,
  isFollowInProgress: Array<number>,
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  getPageNumber: (numberPage: number) => void
}

const Users: React.FC<propsType> = (props) => {

  let users = props.users.map((user: usersType) => <User follow={props.follow} unfollow={props.unfollow}
                                                         name={user.name} id={user.id} photo={user.photos.small}
                                                         status={user.status} followed={user.followed}
                                                         key={user.id} authId={props.authId}
                                                         isFollowInProgress={props.isFollowInProgress}/>)

  return (
    <div className={s.wrapper}>
      <Paginator hidePaginator={props.isPreloader} getPageNumber={props.getPageNumber} currentPage={props.pageNumber} pageSize={props.pageSize}
                 totalCount={props.totalCount} sizePaginator={10}>
        <div>
          {!props.isPreloader ? <UsersLoader/> : users}
        </div>
      </Paginator>
    </div>
  );
}

export default Users;
