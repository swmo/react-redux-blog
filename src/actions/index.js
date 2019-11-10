import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash';

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch(
        {
            type: 'FETCH_POSTS',
            payload: response.data
        }
    )
}

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch(
        {
            type: 'FETCH_USER',
            payload: response.data
        }
    )
}

export const fetchPostAndUsers = () => async (dispatch,getState) => {

    await dispatch(fetchPosts());

    /*
    THREE METHODS:
    */

   /*
    METHOD 01: use normal functions
    const userIds = [... new Set(getState().posts.map((post) => {
        return post.userId
    }))];

    userIds.forEach(id => dispatch(fetchUser(id)));
    */

   /*
    METHOD 02: use lodash
   const userIds = _.uniq(_.map(getState().posts,'userId'));
 userIds.forEach(id => dispatch(fetchUser(id)));
   */

   // Method 03: use lodash chain function (kind of pipe) value() at the end necessary
    _.chain(getState().posts)
     .map('userId')
     .uniq()
     .forEach(
        id => dispatch(fetchUser(id))
     )
     .value(); //execute
}




/*

MEMOIZE WAY:
-------------


export const fetchUser = (id) =>  (dispatch) => {
    _fetchUser(id,dispatch);
}

const _fetchUser = _.memoize(async (id,dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch(
        {
            type: 'FETCH_USER',
            payload: response.data
        }
    )
});

*/