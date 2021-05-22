import {SET_CURRENT_USER} from '../actions/Authactions';
import isEmpty from '../../assets/common/is_empty';

export default function (state, action) {
  console.log('payload', action.payload);
  console.log('state', state);

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}
