import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
   se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritesTitle = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritesTitle).toBeDefined();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const favoriteButton = screen.getByRole('checkbox');
    expect(favoriteButton).toBeDefined();
    userEvent.click(favoriteButton);
    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritesLink).toBeDefined();
    userEvent.click(favoriteButton);

    const pokemonCard = screen.getByText('Pikachu');
    expect(pokemonCard).toBeDefined();
  });
});
