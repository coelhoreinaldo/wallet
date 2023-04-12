import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import initialState from './helpers/initialState';
import mockData from './helpers/mockData';

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
    const descEl1 = screen.getByRole('cell', { name: /subway/i });
    expect(descEl1).toBeInTheDocument();

    const methEl1 = screen.getByRole('cell', { name: /cartão de débito/i });
    expect(methEl1).toBeInTheDocument();

    const tagEl1 = screen.getByRole('cell', { name: /alimentação/i });
    expect(tagEl1).toBeInTheDocument();

    const valEl1 = screen.getByRole('cell', { name: /1\.00/i });
    expect(valEl1).toBeInTheDocument();

    const moedEl = screen.getAllByRole('cell', { name: /dólar americano\/real brasileiro/i });
    expect(moedEl).toHaveLength(3);

    const cambioEl1 = screen.getAllByRole('cell', { name: /4\.75/i });
    expect(cambioEl1).toHaveLength(4);

    const convertedVal2 = screen.getByRole('cell', { name: /9\.51/i });
    expect(convertedVal2).toBeInTheDocument();

    const conversionExchEl1 = screen.getAllByRole('cell', { name: 'Real' });
    expect(conversionExchEl1).toHaveLength(3);
  });

  it('should remove a item when the remove button is clicked', () => {
    const descEl1 = screen.getByRole('cell', { name: /subway/i });
    expect(descEl1).toBeInTheDocument();

    const rmvButton = screen.getAllByRole('button', { name: /excluir/i });
    expect(rmvButton[0]).toBeInTheDocument();

    userEvent.click(rmvButton[0]);
    expect(descEl1).not.toBeInTheDocument();
  });

  it('should remove a item and a new one should be added when the edit button is clicked', async () => {
    const editedItem = {
      id: 2,
      value: '5',
      currency: 'USD',
      method: 'Dinheiro',
      description: 'Oftalmologista',
      exchangeRates: mockData,
    };

    const descEl3 = screen.getByRole('cell', { name: /dentista/i });
    expect(descEl3).toBeInTheDocument();

    const editButton = screen.getAllByRole('button', { name: /excluir/i });
    expect(editButton[2]).toBeInTheDocument();

    userEvent.click(editButton[2]);
    expect(descEl3).not.toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, editedItem.value);

    const descInput = screen.getByTestId('description-input');
    userEvent.type(descInput, editedItem.description);

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);

    const newEl3Desc = await screen.findByRole('cell', { name: /5\.00/i });
    expect(newEl3Desc).toBeInTheDocument();
  });
});
