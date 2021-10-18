import profileReducer, { addPost, postType, userType } from './profileReducer';

let state = {
  user: {} as userType,
  status: '',
  posts: [{post: 'Hi', id: 1},
    {post: 'Boy', id: 2},
    {post: 'Well', id: 3},] as Array<postType>,
  newPostText: 'Ruslanchik',
  isPreloader: false
}

test('new post should be added', () => {
  let action = addPost()

  let newState = profileReducer(state,action)

  expect(newState.posts.length).toBe(4)
});

test('text of new post should be correct', () => {
  let action = addPost()

  let newState = profileReducer(state,action)

  expect(newState.posts[3].post).toBe('Ruslanchik')
});
