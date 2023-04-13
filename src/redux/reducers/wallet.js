import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, REQUEST_FAILED,
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL } from '../actions/walletAction';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  errorMessage: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case REQUEST_STARTED:
    return {
      ...state,
      errorMessage: '',
    };
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: payload.map((code) => code.code),
      errorMessage: '',
    };
  case REQUEST_FAILED:
    return {
      ...state,
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
