import { render, screen } from '@testing-library/react';

import App from './index';

describe('App component', () => {
  it('take a snapshot when render', () => {
    const component = render(<App />);
    expect(component).toMatchSnapshot();
  });

  it('checking the structure of the application', () => {
    render(<App />);

    // header
    expect(screen.getByRole('banner')).toBeInTheDocument;

    // input
    expect(screen.getByRole('textbox')).toBeInTheDocument;

    //buttons
    expect(screen.getByRole('button', { name: 'buttons.add' })).toBeInTheDocument;
    expect(screen.getByRole('button', { name: 'buttons.remove' })).toBeInTheDocument;

    //select
    expect(screen.getByRole('combobox')).toBeInTheDocument;

    //options
    expect(screen.getAllByRole('option')).toBeInTheDocument;

    //h2
    expect(screen.getByRole('heading')).toBeInTheDocument;
  });

  it('renders with a className equal to the container', () => {
    render(<App />);
    expect(screen.getByTestId('container-element')).toHaveClass('container');
  });

  it('renders with header element', () => {
    render(<App />);
    const header = screen.getByTestId('header-element');
    expect(screen.getByTestId('container-element')).toContainElement(header);
  });

  it('dont have accessible description', () => {
    render(<App />);
    expect(screen.getByTestId('container-element')).not.toHaveAccessibleDescription();
  });

  // it('maximum width App must be 1920px', () => {
  //   render(<App />);
  //   expect(screen.getByTestId('container-element')).toHaveStyle('max-width: 1920px');
  // });
});