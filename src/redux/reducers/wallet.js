// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { COIN_TYPES, ADD_EXPENSES, GET_DATA,
  SUM_EXPENSES, DELETE_EXPENSES,
  ARRAY_EXPENSES_TO_EDIT, EDIT_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case COIN_TYPES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: action.bool,
      idToEdit: action.idToEdit,
    };
  case ARRAY_EXPENSES_TO_EDIT:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (expense.id === state
        .idToEdit ? { ...action.payload, exchangeRates: expense.exchangeRates }
        : expense)),
    };
  case GET_DATA:
    return {
      ...state,
      exchangeRates: action.payload,
    };
  case SUM_EXPENSES:
    return {
      ...state,
      total: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
