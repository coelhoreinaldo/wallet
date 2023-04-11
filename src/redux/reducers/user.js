// Esse reducer será responsável por tratar as informações da pessoa usuária

import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
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
