export const fetchCurrenciesApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const dataValues = Object.values(data);
  const dataValuesWithoutUSDT = dataValues.filter(({ codein }) => codein !== 'BRLT');
  return dataValuesWithoutUSDT;
};

export const fetchExchangesApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};
