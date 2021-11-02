import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './index';

describe('App', () => {
  it('checking the structure of the application', () => {
    render(<App />);
    // header
    expect(screen.getByRole('banner')).toBeInTheDocument;

    // input
    expect(screen.getByRole('textbox')).toBeInTheDocument;

    //buttons add and remove
    expect(screen.getAllByRole('button')).toBeInTheDocument;

    //select
    expect(screen.getByRole('combobox')).toBeInTheDocument;

    //options
    expect(screen.getAllByRole('option')).toBeInTheDocument;

    //h2
    expect(screen.getByRole('heading')).toBeInTheDocument;
  });
});

/*
Search variants:
  getBy:                    queryby:                    findBy:
- getByText               - queryByText               - findByText
- getByRole               - queryByRole               - findByRole
- getByLabelText          - queryByLabelText          - findByLabelText
- getByPlaceholderText    - queryByPlaceholderText    - findByPlaceholderText
- getByAltText            - queryByAltText            - findByAltText
- getByDisplayValue       - queryByDisplayValue       - findByDisplayValue
- getAllBy                - queryAllBy                - findAllBy
*/

/*
Assertive Functions:
- toBeDisabled            - toBeEnabled               - toBeEmpty
- toBeEmptyDOMElement     - toBeInTheDocument         - toBeInvalid
- toBeRequired            - toBeValid                 - toBeVisible
- toContainElement        - toContainHTML             - toHaveAttribute
- toHaveClass             - toHaveFocus               - toHaveFormValues
- toHaveStyle             - toHaveTextContent         - toHaveValue
- toHaveDisplayValue      - toBeChecked               - toBePartiallyChecked
- toHaveDescription
*/
