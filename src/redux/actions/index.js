// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const COIN_TYPES = 'COIN_TYPES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const GET_DATA = 'GET_DATA';
export const SUM_EXPENSES = 'GET_DATA';

export const handleAction = (action, payload) => ({ type: action, payload });

export const walletCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const infoCoins = Object.keys(data);
  const infoFilter = infoCoins.filter((coin) => coin !== 'USDT');
  const result = dispatch(handleAction(COIN_TYPES, infoFilter));
  return result;
};

export const refreshCurrencies = (infoCurrency) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const { id,
    value,
    description,
    currency,
    method,
    tag,
  } = infoCurrency;

  const refreshExpense = {
    id: id.length,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates: data,
  };
  dispatch(handleAction(ADD_EXPENSES, refreshExpense));
};
