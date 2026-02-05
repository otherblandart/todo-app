import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NewTodo from '../src/components/NewTodo';
import useTodoStore from '../src/stores/todoStore';

import '@testing-library/jest-dom';

jest.mock('../src/stores/todoStore');

const mockUseTodoStore = useTodoStore as jest.MockedFunction<
  typeof useTodoStore
>;

describe('NewTodo', () => {
  it('renders the input field and button', () => {
    const mockAddTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({ addTodo: mockAddTodo } as never),
    );
    render(<NewTodo />);

    expect(screen.getByPlaceholderText(/add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onAdd with input value when form is submitted', async () => {
    const user = userEvent.setup();
    const mockAddTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({ addTodo: mockAddTodo } as never),
    );
    render(<NewTodo />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    await user.type(input, 'Test todo item');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(mockAddTodo).toHaveBeenCalledWith('Test todo item');
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
  });

  it('clears input after submission', async () => {
    const user = userEvent.setup();
    const mockAddTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({ addTodo: mockAddTodo } as never),
    );
    render(<NewTodo />);

    const input = screen.getByPlaceholderText(
      /add a new todo/i,
    ) as HTMLInputElement;
    await user.type(input, 'Clear test');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(input.value).toBe('');
  });

  it('does not call onAdd when input is empty', async () => {
    const user = userEvent.setup();
    const mockAddTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({ addTodo: mockAddTodo } as never),
    );
    render(<NewTodo />);

    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('does not call onAdd when input is only whitespace', async () => {
    const user = userEvent.setup();
    const mockAddTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({ addTodo: mockAddTodo } as never),
    );
    render(<NewTodo />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
