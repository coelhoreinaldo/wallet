import { fetchCurrenciesApi } from '../../utils/fetchCurrencies';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const requestStarted = () => ({ type: REQUEST_STARTED });

const requestSuccessful = (payload) => ({ type: REQUEST_SUCCESSFUL, payload });

const requestFailed = (payload) => ({ type: REQUEST_FAILED, payload });

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestStarted());
  try {
    const currencies = await fetchCurrenciesApi();
    const dataValues = Object.values(currencies);
    const dataValuesWithoutUSDT = dataValues.filter(({ codein }) => codein !== 'BRLT');
    // const dataValuesWithBrl = [
    //   {
    //     code: 'BRL',
    //     ask: '1',
    //     name: 'Real Oficial',
    //   },
    //   ...dataValuesWithoutUSDT,
    // ];
    dispatch(requestSuccessful(dataValuesWithoutUSDT));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });

export const removeExpense = (payload) => ({ type: REMOVE_EXPENSE, payload });

export const editExpense = (payload) => ({ type: EDIT_EXPENSE, payload });
