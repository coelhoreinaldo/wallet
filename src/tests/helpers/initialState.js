import mockData from './mockData';

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com',
  },
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
    expenses: [
      {
        id: 0,
        value: '1',
        currency: 'USD',
        method: 'Cartão de débito',
        tag: 'Alimentação',
        description: 'Subway',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '2',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Bar',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '3',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Saúde',
        description: 'Dentista',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
    isFetching: false,
    errorMessage: '',
  },
};

export default INITIAL_STATE;
