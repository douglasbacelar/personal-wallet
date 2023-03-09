// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
import { combineReducers } from 'redux';

// importa os reducers
import user from './user';
import wallet from './wallet';

const rootReducer = combineReducers(
  {
    user,
    wallet,
  },
);

export default rootReducer;
