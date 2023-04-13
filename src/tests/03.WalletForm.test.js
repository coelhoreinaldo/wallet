import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const INITIAL_STATE = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
    editor: false,
    idToEdit: 0,
    isFetching: false,
    errorMessage: '',
  },
};

describe('the table component', () => {
  it('should add a new item when the add-button is clicked', async () => {
    renderWithRedux(<Wallet />, { initialState: INITIAL_STATE });

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '1');
    const descInput = screen.getByTestId('description-input');
    userEvent.type(descInput, 'Roupas');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);

    const descEl = await screen.findByRole('cell', {
      name: /roupas/i,
    });
    expect(descEl).toBeInTheDocument();
  });
});

describe('the fetch api function', () => {
  it('should be throw a error if nothing happens', () => {
    // jest.spyOn(global, 'fetch').mockRejectedValue({
    //   json: async () => (valorRetornadoPelaAPI),
    // });
  });
});
