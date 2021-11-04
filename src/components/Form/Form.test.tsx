import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from './index';

describe('Form component', () => {
  it('take a snapshot when render', () => {
    const component = render(<Form />);
    expect(component).toMatchSnapshot();
  });

  it('renders the form correctly', () => {
    render(<Form />);
    expect(screen.getByRole('textbox')).toBeInTheDocument;
    expect(screen.getByRole('button', { name: 'buttons.add' })).toBeInTheDocument;
  });

  it('checked submit form', () => {
    const onSubmit = jest.fn();
    render(<Form />);

    const form = screen.getByTestId('form-element');
    form.onsubmit = onSubmit;
    const inputValue = 'London';

    fireEvent.change(screen.getByRole('textbox'), { target: { value: inputValue } });
    fireEvent.click(screen.getByRole('button', { name: 'buttons.add' }));

    expect(onSubmit).toBeCalled();
  });

  it('checked submit form when empty input field', () => {
    const onSubmit = jest.fn();
    render(<Form />);

    const form = screen.getByTestId('form-element');
    form.onsubmit = onSubmit;
    const inputValue = '';

    fireEvent.change(screen.getByRole('textbox'), { target: { value: inputValue } });
    fireEvent.click(screen.getByRole('button', { name: 'buttons.add' }));

    const result = expect(onSubmit).toBeCalled();
    expect(result).toBeUndefined();
  });
});
