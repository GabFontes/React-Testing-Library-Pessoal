import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it(`Teste se é renderizado um card com as informações
  de determinado pokémon`, () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokeImg = screen.getByAltText('Pikachu sprite');
    expect(pokeImg.src)
      .toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de
   navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<App />);

    const pokeInfo = screen.getByRole('link', { name: /More details/i });
    expect(pokeInfo).toBeDefined();
    expect(pokeInfo).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o 
  redirecionamento para a página de detalhes do Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const pokeInfo = screen.getByRole('link', { name: /More details/i });
    expect(pokeInfo).toBeDefined();
    userEvent.click(pokeInfo);

    const summary = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    const { location: { pathname } } = history;
    expect(summary).toBeDefined();
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokeInfo = screen.getByRole('link', { name: /More details/i });
    expect(pokeInfo).toBeDefined();
    userEvent.click(pokeInfo);

    const favoritePokeCheckbox = screen.getByRole('checkbox');
    expect(favoritePokeCheckbox).toBeDefined();
    userEvent.click(favoritePokeCheckbox);

    const starFavIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFavIcon).toBeDefined();
    expect(starFavIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
