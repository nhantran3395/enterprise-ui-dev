import { render, screen, within } from 'test/utilities';
import PackingList from '.';
import userEvent from "@testing-library/user-event";

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  expect(screen.getByRole('searchbox', { name: /new item/i})).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add new item/i})).toBeInTheDocument();
});

it(
  'has a "Add New Item" button that is disabled when the input is empty',
  () => {
    render(<PackingList />);
    expect(screen.getByRole('button', { name: /add new item/i})).toBeDisabled();
  },
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
      const user = userEvent.setup();
      render(<PackingList />);
      await user.type(screen.getByRole('searchbox', { name: /new item/i}), 'iPhone');
      expect(screen.getByRole('button', { name: /add new item/i})).not.toBeDisabled();
  },
);

it(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
      const user = userEvent.setup();
      render(<PackingList />);
      await user.type(screen.getByRole('searchbox', { name: /new item/i}), 'iPhone');
      await user.click(screen.getByRole('button', { name: /add new item/i}));
      expect(within(screen.getByTestId('unpacked-items')).getByLabelText('iPhone')).not.toBeChecked();
  },
);
