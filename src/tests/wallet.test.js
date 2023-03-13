import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

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
});
