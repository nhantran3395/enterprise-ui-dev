import { ReactElement } from "react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import { render, screen, within } from 'test/utilities';
import { PackingList } from '.';

import { createStore } from "./store";

const renderWithStoreProvider = (ui : ReactElement) => {
    return render(
        <Provider store={createStore()}>
            {ui}
        </Provider>
    );
};

it('renders the Packing List application', () => {
  renderWithStoreProvider(<PackingList />);
});

it('has the correct title', async () => {
  renderWithStoreProvider(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  renderWithStoreProvider(<PackingList />);
  expect(screen.getByRole('searchbox', { name: /new item/i})).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add new item/i})).toBeInTheDocument();
});

it(
  'has a "Add New Item" button that is disabled when the input is empty',
  () => {
    renderWithStoreProvider(<PackingList />);
    expect(screen.getByRole('button', { name: /add new item/i})).toBeDisabled();
  },
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
      const user = userEvent.setup();
      renderWithStoreProvider(<PackingList />);
      await user.type(screen.getByRole('searchbox', { name: /new item/i}), 'iPhone');
      expect(screen.getByRole('button', { name: /add new item/i})).not.toBeDisabled();
  },
);

it(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
      const user = userEvent.setup();
      renderWithStoreProvider(<PackingList />);
      await user.type(screen.getByRole('searchbox', { name: /new item/i}), 'iPhone');
      await user.click(screen.getByRole('button', { name: /add new item/i}));
      expect(within(screen.getByTestId('unpacked-items')).getByLabelText('iPhone')).not.toBeChecked();
  },
);
