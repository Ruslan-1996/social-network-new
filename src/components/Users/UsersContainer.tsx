import React, { useEffect } from 'react';
import Users from "./Users";
import {
  follow,
  unfollow,
  getPageNumberAC, getUsers,
} from "../../store/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsFollowInProgress,
  selectIsPreloaderUsers, selectPageNumber, selectPageSize,
  selectTotalCount,
  selectUsers,
} from "../../store/usersSeletor";
import { selectAuthId } from "../../store/authSelector";
import PaginatorLoader from './PaginatorLoader/PaginatorLoader';
import UsersLoader from './UsersLoader/UsersLoader';
import s from './Users.module.css'

const UsersContainer = () => {

  const users = useSelector(selectUsers)
  const totalCount = useSelector(selectTotalCount)
  const pageSize = useSelector(selectPageSize)
  const pageNumber = useSelector(selectPageNumber)
  const isPreloader = useSelector(selectIsPreloaderUsers)
  const isFollowInProgress = useSelector(selectIsFollowInProgress)
  const authId = useSelector(selectAuthId)

  const dispatch = useDispatch()
  const followDispatch = (userId: number) => dispatch(follow(userId))
  const unfollowDispatch = (userId: number) => dispatch(unfollow(userId))
  const getPageNumber = (p: number) => dispatch(getPageNumberAC(p))

  useEffect(() => {
    dispatch(getUsers(pageSize, pageNumber))
  }, [pageNumber, pageSize, dispatch])

  if (totalCount === 0) {
    return (
      <div className={s.wrapper}>
        <PaginatorLoader sizePaginator={10}>
          <UsersLoader/>
        </PaginatorLoader>
      </div>
    )
  }

  return (
    <Users isPreloader={isPreloader} pageNumber={pageNumber} getPageNumber={getPageNumber} pageSize={pageSize}
           totalCount={totalCount} users={users} follow={followDispatch} unfollow={unfollowDispatch}
           isFollowInProgress={isFollowInProgress} authId={authId}/>
  );
}

export default UsersContainer
