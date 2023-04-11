// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { REQUEST_FAILED,
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL } from '../actions/walletAction';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
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
  default:
    return state;
  }
};

export default walletReducer;
