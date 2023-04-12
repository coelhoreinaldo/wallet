import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, REQUEST_FAILED,
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL } from '../actions/walletAction';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
  errorMessage: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
      errorMessage: '',
    };
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      currencies: payload.map((code) => code.code),
      errorMessage: '',
    };
  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload].sort((a, b) => Number(a.id) - Number(b.id)),
      editor: false,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((e) => e !== payload)],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: state.expenses[payload].id,
    };
  default:
    return state;
  }
};

export default walletReducer;
