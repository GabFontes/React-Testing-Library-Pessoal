import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i })

    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favoritePokemonsLink).toBeDefined();

  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeDefined();
    userEvent.click(homeLink);

    const homeTitle = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 })
    expect(homeTitle).toBeDefined();
    expect(pathname).toBe('/');

  })

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i })
    expect(aboutLink).toBeDefined();
    userEvent.click(aboutLink);

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 })
    expect(aboutTitle).toBeDefined();
    console.log(history);
    const { location: { pathname: pathNameAbout } } = history;
    expect(pathNameAbout).toBe('/about')

  })

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemonsLink).toBeDefined();
    userEvent.click(favoritePokemonsLink);

    const favoritesTitle = screen.getByRole('heading', { name: /Favorite pokémons/i });
    expect(favoritesTitle).toBeDefined();
    const { location: { pathname: pathNameFavorites } } = history;
    expect(pathNameFavorites).toBe('/favorites')

  })

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/teste')

    const altImg = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(altImg).toBeDefined();

  })
})
