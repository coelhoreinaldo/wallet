import { ADD_EMAIL } from '../actions/userAction';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, email } = action;
  switch (type) {
  case ADD_EMAIL:
    return ({
      ...state,
      email,
    });

  default:
    return state;
  }
};

export default userReducer;
