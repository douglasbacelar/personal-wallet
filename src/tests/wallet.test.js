import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';
import App from '../App';

describe('Testes para a página Login', () => {
  test('Verifica se todos os inputs e o button estão na página corretamente', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const expenseValue = screen.getByLabelText('Valor');
    const expenseDescription = screen.getByLabelText('Descrição');
    const expenseCurrency = screen.getByLabelText('Moeda');
    const expenseMethod = screen.getByLabelText('Método de Pagamento');
    const expenseTag = screen.getByLabelText('Categoria');
    const button = screen.getByRole('button');

    expect(expenseValue).toBeInTheDocument();
    expect(expenseDescription).toBeInTheDocument();
    expect(expenseCurrency).toBeInTheDocument();
    expect(expenseMethod).toBeInTheDocument();
    expect(expenseTag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Teste se o fetch carregou as currencies no componentDidMount', async () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        expenseTotal: 0,
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />, { initialState });

    expect(global.fetch).toBeCalledTimes(1);

    const coinInput = await screen.findByLabelText('Moeda');
    expect(coinInput).toBeInTheDocument();
  });

  test('Teste se adiciona uma despesa corretamente no estado global', async () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        expenseTotal: 0,
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    expect(global.fetch).toBeCalledTimes(1);
    expect(store.getState().wallet.expenses).toHaveLength(0);

    const expenseValue = screen.getByLabelText('Valor');
    const expenseDescription = screen.getByLabelText('Descrição');
    const addBtn = screen.getByRole('button');

    userEvent.type(expenseValue, 15);
    userEvent.type(expenseDescription, 'Teste');
    userEvent.click(addBtn);

    const expenseTyped = await screen.findByText('Teste');
    expect(expenseTyped).toBeInTheDocument();
  });

  test('Testa se exclui corretamente uma despesa', async () => {
    const testExpense = {
      id: 0,
      value: '5',
      description: 'teste',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    };

    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        expenseTotal: 0,
        currencies: [],
        expenses: [testExpense],
        editor: false,
        idToEdit: 0,
      },
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const writeDescription = await screen.findByText('teste');
    expect(writeDescription).toBeInTheDocument();

    const deleteButton = await screen.findByRole('button', { name: 'Excluir' });
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);

    expect(writeDescription).not.toBeInTheDocument();
  });
});
