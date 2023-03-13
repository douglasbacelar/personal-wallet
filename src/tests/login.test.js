import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testes para a página Login', () => {
  test('Página inicial começa com a rota /', () => {
    const initialEntries = ['/'];
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Ter apenas um botão na página e 2 inputs', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Password:');
    expect(passwordInput).toBeInTheDocument();

    const button = screen.getByTestId('login-submit-button');
    expect(button).toBeInTheDocument();
  });

  test('Ao escrever e-mail e senha incorretamente, o botão não será habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');
    const emailInput = inputs[0];
    const passwordInput = inputs[1];
    const button = screen.getByTestId('login-submit-button');

    userEvent.type(emailInput, 'testeteste.com');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();
  });

  test('Ao escrever e-mail e senha corretamente, o botão será habilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const button = screen.getByRole('button');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeEnabled();
  });

  test('Testa se atualiza o estado global e navega para /carteira', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const button = screen.getByRole('button');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);

    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });
});
