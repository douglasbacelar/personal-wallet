import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import { renderWithRouterAndRedux } from './renderWith';

describe('Validação dos campos da renderização da página Login', () => {
  test('Ter apenas um botão na página', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.queryAllByRole('button');
    expect(button.length).toBe(1);
  });

  test('Ao escrever e-mail e senha corretamente, ser redirecionado para a página /carteira, caso escreva o usuário e a senha incorretamente, o botão não será habilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const button = screen.getByTestId('login-submit-button');

    userEvent.type(emailInput, 'testeteste.com');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();
  });

  test('olha ae', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-button');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeEnabled();

    userEvent.click(button);

    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });
});
