import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoItem from '../src/components/TodoItem';
import useTodoStore from '../src/stores/todoStore';

import '@testing-library/jest-dom';

jest.mock('../src/stores/todoStore');

const mockUseTodoStore = useTodoStore as jest.MockedFunction<
  typeof useTodoStore
>;

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false,
  };

  it('renders todo text', () => {
    const mockToggleTodo = jest.fn();
    const mockRemoveTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({
        toggleTodo: mockToggleTodo,
        removeTodo: mockRemoveTodo,
      } as never),
    );

    render(<TodoItem todo={mockTodo} />);

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('renders checkbox unchecked when todo is not completed', () => {
    const mockToggleTodo = jest.fn();
    const mockRemoveTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({
        toggleTodo: mockToggleTodo,
        removeTodo: mockRemoveTodo,
      } as never),
    );

    render(<TodoItem todo={mockTodo} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox checked when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const mockToggleTodo = jest.fn();
    const mockRemoveTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({
        toggleTodo: mockToggleTodo,
        removeTodo: mockRemoveTodo,
      } as never),
    );

    render(<TodoItem todo={completedTodo} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onToggle with todo id when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const mockToggleTodo = jest.fn();
    const mockRemoveTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({
        toggleTodo: mockToggleTodo,
        removeTodo: mockRemoveTodo,
      } as never),
    );

    render(<TodoItem todo={mockTodo} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockToggleTodo).toHaveBeenCalledWith('1');
    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete with todo id when delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockToggleTodo = jest.fn();
    const mockRemoveTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({
        toggleTodo: mockToggleTodo,
        removeTodo: mockRemoveTodo,
      } as never),
    );

    render(<TodoItem todo={mockTodo} />);

    const deleteButton = screen.getByRole('button', { name: /×/i });
    await user.click(deleteButton);

    expect(mockRemoveTodo).toHaveBeenCalledWith('1');
    expect(mockRemoveTodo).toHaveBeenCalledTimes(1);
  });

  it('applies completed styling when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const mockToggleTodo = jest.fn();
    const mockRemoveTodo = jest.fn();
    mockUseTodoStore.mockImplementation((selector) =>
      selector({
        toggleTodo: mockToggleTodo,
        removeTodo: mockRemoveTodo,
      } as never),
    );

    render(<TodoItem todo={completedTodo} />);

    const todoText = screen.getByText('Test todo');
    expect(todoText).toHaveClass('completed');
  });
});
