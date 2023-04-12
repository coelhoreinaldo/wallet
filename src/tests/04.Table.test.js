import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import initialState from './helpers/initialState';

describe('the table component', () => {
  beforeEach(() => {
    renderWithRedux(<Wallet />, { initialState });
  });

  it('should have a header with description, moeda and other fields', () => {
    const moedaCel = screen.getByRole('columnheader', {
      name: 'Moeda',
    });
    expect(moedaCel).toBeInTheDocument();

    const descrEl = screen.getByRole('columnheader', { name: /descrição/i });
    expect(descrEl).toBeInTheDocument();

    const editOrRmvEl = screen.getByRole('columnheader', { name: /editar\/excluir/i });
    expect(editOrRmvEl).toBeInTheDocument();
  });

  it('should have values from initial state', () => {
    screen.getByRole('cell', { name: /subway/i });
  });
});
