import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/One can filter Pokémons by type,/i);
    expect(pokedexInfo).toBeDefined();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutTitle).toBeDefined();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type,/i);
    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
  });

  it('Teste se a página contém uma imagem de pokedex', () => {
    renderWithRouter(<About />);

    // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
    + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
