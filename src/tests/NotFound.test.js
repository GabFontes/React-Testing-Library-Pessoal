import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se página contém um heading h2
   com o texto Page requested not found 😭`, () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading',
      {
        name: /Page requested not found/i,
        level: 2,
      });
    expect(notFoundTitle).toBeDefined();
  });

  it(`Teste se página mostra a imagem
   https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(notFoundImg).toBeDefined();
    expect(notFoundImg)
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
