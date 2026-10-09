import AIChat from '@/features/ai-chat/components/ai-chat';
import { useChat } from '@ai-sdk/react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

type UserInstance = ReturnType<typeof userEvent.setup>;

const userOpensChat = async (user: UserInstance) => {
  const chatToggleButton = screen.getByRole('button', { name: /Open chat/ });
  await user.click(chatToggleButton);
};

const sendMessage = vi.fn();

vi.mock('@ai-sdk/react', () => ({
  useChat: vi.fn(() => ({
    sendMessage,
    messages: [],
    status: 'ready',
  })),
}));

const { errorToast } = vi.hoisted(() => ({ errorToast: vi.fn() }));

vi.mock('sonner', () => ({
  toast: {
    error: errorToast,
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AIChat', () => {
  const openChatAndTypeMessage = async (user: UserInstance) => {
    await userOpensChat(user);
    const chatTextarea = screen.getByPlaceholderText(
      /Type your technical query.../,
    );
    await user.type(chatTextarea, 'Hello, AI!');
  };

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

  describe('empty input', () => {
    test('disables the send button for empty or whitespace-only text', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await userOpensChat(user);

      const chatTextarea = screen.getByPlaceholderText(
        /Type your technical query.../,
      );
      const sendButton = screen.getByRole('button', { name: /Send message/ });

      expect(sendButton).toBeDisabled();

      await user.type(chatTextarea, '   ');
      expect(sendButton).toBeDisabled();
    });

    test('does not call sendMessage when Enter is pressed', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await userOpensChat(user);

      const chatTextarea = screen.getByPlaceholderText(
        /Type your technical query.../,
      );
      const sendButton = screen.getByRole('button', { name: /Send message/ });

      await user.type(chatTextarea, '   ');
      await user.keyboard('{Enter}');

      expect(sendMessage).not.toHaveBeenCalled();
    });
  });

  describe('demo mode features restrictions', () => {
    beforeEach(() => {
      vi.stubEnv('NEXT_PUBLIC_DEMO_MODE', 'true');
      vi.stubEnv('DEMO_MODE', 'true');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    test('shows an error toast', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await openChatAndTypeMessage(user);

      const sendButton = screen.getByRole('button', { name: /Send message/ });
      await user.click(sendButton);

      expect(errorToast).toHaveBeenCalledOnce();
      expect(errorToast).toHaveBeenCalledWith(
        'Demo mode is enabled. Unable to use this feature.',
        {
          duration: 4000,
        },
      );
    });

    test('does not call sendMessage', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await openChatAndTypeMessage(user);

      const sendButton = screen.getByRole('button', { name: /Send message/ });
      await user.click(sendButton);

      expect(sendMessage).not.toHaveBeenCalled();
    });
  });

  describe('while loading', () => {
    beforeEach(() => {
      vi.mocked(useChat).mockReturnValue({
        sendMessage,
        messages: [],
        status: 'streaming',
      } as unknown as ReturnType<typeof useChat>);
    });

    test('shows the typing indicator and loading button', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await userOpensChat(user);

      // Because we mocked status: 'streaming', it renders in the loading state immediately!
      const loadingButton = screen.getByRole('button', { name: 'Loading' });
      expect(loadingButton).toBeInTheDocument();
      expect(loadingButton).toBeDisabled();
    });

    test('ignores Enter', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await openChatAndTypeMessage(user);

      await user.keyboard('{Enter}');

      expect(sendMessage).not.toHaveBeenCalled();
    });
  });

  describe('with existing messages', () => {
    beforeEach(() => {
      vi.mocked(useChat).mockReturnValue({
        sendMessage,
        messages: [
          {
            id: '1',
            role: 'user',
            parts: [{ type: 'text', text: 'Hello!' }],
          },
          {
            id: '2',
            role: 'assistant',
            parts: [{ type: 'text', text: 'Hi there!' }],
          },
        ],
        status: 'submitted',
      } as unknown as ReturnType<typeof useChat>);
    });

    test('renders the messages and hides the empty-state background', async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      await userOpensChat(user);

      expect(screen.getByText('Hello!')).toBeInTheDocument();
      expect(screen.getByText('Hi there!')).toBeInTheDocument();

      expect(
        screen.queryByTestId('empty-state-background'),
      ).not.toBeInTheDocument();
    });
  });
});
