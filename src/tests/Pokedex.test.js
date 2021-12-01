import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  const VALUE = 7;
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading',
      {
        name: /Encountered pokémons/i,
        level: 2,
      });
    expect(pokedexTitle).toBeDefined();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
  });

  it(`Teste se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const pikachuCard = screen.getByText(/Pikachu/i);
    expect(pikachuCard).toBeDefined();

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeDefined();
    userEvent.click(nextButton);

    const charmanderCard = screen.getByText(/Charmander/i);
    expect(charmanderCard).toBeDefined();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(VALUE);

    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    const pokemonTypeParagraph = screen.getByTestId('pokemon-type');
    expect(pokemonTypeParagraph).toHaveTextContent('Fire');

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeDefined();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /All/i });
    // Créditos a Thread do Gabriel Oliveira.
    userEvent.click(allButton);
    expect(allButton).toBeDefined();

    const pokemonTypeParagraph = screen.getByTestId('pokemon-type');
    expect(pokemonTypeParagraph).toHaveTextContent('Electric');

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeDefined();
    userEvent.click(nextButton);

    expect(pokemonTypeParagraph).toHaveTextContent('Fire');
  });
});
