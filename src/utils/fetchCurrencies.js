export const fetchCurrenciesApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const dataValuesWithBrl = {
    BRL: {
      code: 'BRL',
      ask: '1',
      name: 'Real Oficial',
    },
    ...data,
  };
  return dataValuesWithBrl;
};
