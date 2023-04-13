import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const email = 'user@teste.com';

describe('the login page', () => {
  it('should have the elements', () => {
    renderWithRouterAndRedux(<App />);
    const titleElement = screen.getByRole('heading', {
      name: /wallet!/i,
      level: 1,
    });
    expect(titleElement).toBeInTheDocument();

    const emailEl = screen.getByTestId(emailTestId);
    expect(emailEl).toBeInTheDocument();

    const passwordEl = screen.getByTestId(passwordTestId);
    expect(passwordEl).toBeInTheDocument();

    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeInTheDocument();
  });

  it('should validate email field', () => {
    renderWithRouterAndRedux(<App />);
    const emailEl = screen.getByTestId(emailTestId);
    const passwordEl = screen.getByTestId(passwordTestId);
    userEvent.type(emailEl, 'testando');
    userEvent.type(passwordEl, '123456');

    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeDisabled();
  });

  it('should validate password field', () => {
    renderWithRouterAndRedux(<App />);
    const emailEle = screen.getByTestId(emailTestId);
    const passwordEl = screen.getByTestId(passwordTestId);
    userEvent.type(emailEle, email);
    userEvent.type(passwordEl, '123');

    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeDisabled();
  });

  it('should enable the button if inputs are valid', () => {
    renderWithRouterAndRedux(<App />);
    const emailEle = screen.getByTestId(emailTestId);
    const passwordEl = screen.getByTestId(passwordTestId);
    userEvent.type(emailEle, email);
    userEvent.type(passwordEl, '123435');

    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeEnabled();
  });

  it('should redirect to wallet page when click the button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailEle = screen.getByTestId(emailTestId);
    const passwordEl = screen.getByTestId(passwordTestId);
    userEvent.type(emailEle, email);
    userEvent.type(passwordEl, '123435');

    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonEl);

    expect(history.location.pathname).toBe('/carteira');
  });
});
