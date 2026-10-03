import AIChat from '@/features/ai-chat/components/ai-chat';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

type UserInstance = ReturnType<typeof userEvent.setup>;

const userOpensChat = async (user: UserInstance) => {
  const chatToggleButton = screen.getByRole('button', { name: /Open chat/ });
  await user.click(chatToggleButton);
};

const sendMessage = vi.fn();

vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    sendMessage,
    messages: [],
    status: 'ready',
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AIChat', () => {
  describe('when closed (initial)', () => {
    test('shows the toggle button', () => {
      render(<AIChat />);

      const toggleButton = screen.getByRole('button', { name: /Open chat/ });

      expect(toggleButton).toBeInTheDocument();
    });

    test('does not show the chat window', () => {
      render(<AIChat />);

      const chatWindow = screen.queryByRole('heading', {
        name: /qualtec ai assistant/i,
      });

      expect(chatWindow).not.toBeInTheDocument();
    });
  });

  describe('opening and closing', () => {
    test('opens the window when the toggle is clicked', async () => {
      const user = userEvent.setup();

      render(<AIChat />);

      await userOpensChat(user);

      expect(
        screen.getByRole('heading', {
          name: /qualtec ai assistant/i,
        }),
      ).toBeInTheDocument();
    });

    test('shows the input, a disabled send button, and the empty-state background', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await userOpensChat(user);

      expect(
        screen.getByPlaceholderText(/Type your technical query.../),
      ).toBeInTheDocument();
    });

    test('closes the window when the toggle is clicked again', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await userOpensChat(user);

      const heading = await screen.findByRole('heading', {
        name: /qualtec ai assistant/i,
      });

      const closeToggleButton = screen.getByRole('button', {
        name: 'Close chat',
      });
      await user.click(closeToggleButton);

      await waitForElementToBeRemoved(heading);
    });

    test('closes the window from the header close button', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await userOpensChat(user);
      await user.click(
        screen.getByRole('button', { name: /Close chat window/ }),
      );

      await waitForElementToBeRemoved(() =>
        screen.queryByRole('heading', { name: /qualtec ai assistant/i }),
      );
    });
  });

  describe('sending a message', () => {
    const openChatAndTypeMessage = async (user: UserInstance) => {
      await userOpensChat(user);
      const chatTextarea = screen.getByPlaceholderText(
        /Type your technical query.../,
      );
      await user.type(chatTextarea, 'Hello, AI!');
    };

    test('calls sendMessage with the typed text on submit click', async () => {
      render(<AIChat />);
      const user = userEvent.setup();

      await openChatAndTypeMessage(user);
      const sendButton = screen.getByRole('button', { name: /Send message/ });

      await user.click(sendButton);
      expect(sendMessage).toHaveBeenCalledOnce();
      expect(sendMessage).toHaveBeenCalledWith({ text: 'Hello, AI!' });
    });

    test('sends on Enter', async () => {
      render(<AIChat />);
      const user = userEvent.setup();

      await openChatAndTypeMessage(user);

      await user.keyboard('{Enter}');

      expect(sendMessage).toHaveBeenCalledOnce();
      expect(sendMessage).toHaveBeenCalledWith({ text: 'Hello, AI!' });
    });

    test('does not send on Shift+Enter', async () => {
      render(<AIChat />);
      const user = userEvent.setup();

      await openChatAndTypeMessage(user);

      await user.keyboard('{Shift>}{/Enter}');

      expect(sendMessage).not.toHaveBeenCalled();
    });
    test('clears the input after sending', async () => {
      render(<AIChat />);
      const user = userEvent.setup();

      await openChatAndTypeMessage(user);
      const sendButton = screen.getByRole('button', { name: /Send message/ });
      await user.click(sendButton);

      const chatTextarea = screen.getByPlaceholderText(
        /Type your technical query.../,
      );
      expect(chatTextarea).toHaveValue('');
    });
  });
});
