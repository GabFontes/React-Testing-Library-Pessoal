import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do
   Pokémon selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);

    const pokeInfo = screen.getByRole('link', { name: /More details/i });
    expect(pokeInfo).toBeDefined();
    userEvent.click(pokeInfo);

    const pokeDetailsTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pokeDetailsTitle).toBeDefined();
    expect(pokeDetailsTitle).toHaveTextContent('Pikachu Details');
  });

  it(`Não deve existir o link de navegação para os
   detalhes do Pokémon selecionado`, () => {
    renderWithRouter(<App />);

    const pokeInfo = screen.getByRole('link', { name: /More details/i });
    expect(pokeInfo).toBeDefined();
    userEvent.click(pokeInfo);

    expect(pokeInfo).not.toBeInTheDocument();
  });
});

describe('', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  it(`A seção de detalhes deve conter um heading
     h2 com o texto Summary`, () => {
    const summaryTitle = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(summaryTitle).toBeInTheDocument();
  });

  it(`A seção de detalhes deve conter um parágrafo com o resumo do
   Pokémon específico sendo visualizado`, () => {
    const pokeInfo = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pokeInfo).toBeDefined();
  });

  it(`Teste se existe na página uma seção com os mapas
   contendo as localizações do pokémon`, () => {
    const gameLocationsOfPoke = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(gameLocationsOfPoke).toBeDefined();
  });

  it(`Devem ser exibidos, o nome da localização
   e uma imagem do mapa em cada localização`, () => {
    const src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

    const locationImg = screen.getAllByAltText('Pikachu location');
    expect(locationImg).toBeDefined();
    expect(locationImg).toHaveLength(2);
    expect(locationImg[0]).toHaveAttribute('src', src);

    const locationName = screen.getByText('Kanto Viridian Forest');
    expect(locationName).toBeDefined();
  });

  it(`Teste se o usuário pode favoritar um pokémon
   através da página de detalhes`, () => {
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();

    const favoriteCheckBox = screen.getByRole('checkbox');
    expect(favoriteCheckBox).toBeDefined();
  });
});

describe(`Testa se o funcionameto do checkbox da página
 'More Details' está correto`, () => {
  it(`Cliques alternados no checkbox devem adicionar e remover
   respectivamente o Pokémon da lista de favoritos`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const favoriteCheckBox = screen.getByRole('checkbox');
    expect(favoriteCheckBox).toBeDefined();
    userEvent.click(favoriteCheckBox);

    history.push('/favorites');

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeDefined();

    history.goBack();
    userEvent.click(favoriteCheckBox);

    history.push('/favorites');
    expect(pokeName).not.toBeInTheDocument();
  });
});
