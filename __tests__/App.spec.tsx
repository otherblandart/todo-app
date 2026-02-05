import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/App';

import '@testing-library/jest-dom';

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /todo list with vite, react, and zustand/i,
      }),
    ).toBeInTheDocument();
  });

  it('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'New test todo');
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New test todo')).toBeInTheDocument();
    });
  });

  it('toggles todo completion status', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add a todo first
    const input = screen.getByPlaceholderText(/add a new todo/i);

    await user.type(input, 'Toggle test');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = await screen.findByLabelText('Toggle test');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  it('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add a todo first
    const input = screen.getByPlaceholderText(/add a new todo/i);

    await user.type(input, 'Delete test');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const todoText = await screen.findByText('Delete test');
    const todoItem = todoText.closest('li');

    if (!todoItem) {
      throw new Error('Expected todo item list element to exist.');
    }

    const deleteButton = within(todoItem).getByRole('button', { name: '×' });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(todoText).not.toBeInTheDocument();
    });
  });
});
