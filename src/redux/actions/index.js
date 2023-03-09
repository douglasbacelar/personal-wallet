// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const COIN_TYPES = 'COIN_TYPES';

export const userLogin = (payload) => ({ type: USER_LOGIN, payload });
export const currencieType = (payload) => ({ type: COIN_TYPES, payload });

export const walletCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const getKeyCoins = currencieType(Object.keys(data));
  const info = getKeyCoins.payload;
  const infoFilter = info.filter((coin) => coin !== 'USDT');
  const result = dispatch(currencieType(infoFilter));
  return result;
};
