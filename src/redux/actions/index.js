// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const COIN_TYPES = 'COIN_TYPES';
export const SUM_EXPENSES = 'SUM_EXPENSES';

export const handleAction = (action, payload) => ({ type: action, payload });

export const walletCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const getKeyCoins = handleAction(COIN_TYPES, Object.keys(data));
  const info = getKeyCoins.payload;
  const infoFilter = info.filter((coin) => coin !== 'USDT');
  const result = dispatch(handleAction(COIN_TYPES, infoFilter));
  return result;
};

// dispatch(sumOfExpenses(data));
