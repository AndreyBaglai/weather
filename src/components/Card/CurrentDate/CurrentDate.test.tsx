import { render, screen } from '@testing-library/react';

import CurrentDate from './index';

describe('CurrentDate component', () => {
  it('take a snapshot when render with test props', () => {
    const component = render(<CurrentDate city="test" country="test" />);
    expect(component).toMatchSnapshot();
  });
});
