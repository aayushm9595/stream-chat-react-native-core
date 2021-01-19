import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import {
  generateMessage,
  generateStaticMessage,
} from 'mock-builders/generator/message';
import { generateStaticUser } from 'mock-builders/generator/user';

import { MessageAvatar } from '../MessageAvatar';

import { defaultTheme } from '../../../../styles/themeConstants';

afterEach(cleanup);

describe('MessageAvatar', () => {
  it('should render message avatar', async () => {
    const staticUser = generateStaticUser(0);
    const message = generateMessage({
      user: { ...staticUser, image: undefined },
    });
    const {
      getByTestId,
      getByText,
      queryAllByTestId,
      queryAllByText,
      rerender,
      toJSON,
    } = render(
      <ThemeProvider theme={defaultTheme}>
        <MessageAvatar
          alignment='right'
          groupStyles={['bottom']}
          message={message}
        />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('message-avatar')).toBeTruthy();
      expect(getByTestId('avatar-text')).toBeTruthy();
      expect(getByText(staticUser.name.charAt(0))).toBeTruthy();
    });

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <MessageAvatar alignment='right' groupStyles={[]} message={message} />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('spacer')).toBeTruthy();
      expect(queryAllByTestId('avatar-text')).toHaveLength(0);
      expect(queryAllByTestId('avatar-image')).toHaveLength(0);
    });

    const staticMessage = generateStaticMessage('hi', {
      user: staticUser,
    });

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <MessageAvatar
          alignment='left'
          groupStyles={['single']}
          message={staticMessage}
        />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('message-avatar')).toBeTruthy();
      expect(getByTestId('avatar-image')).toBeTruthy();
      expect(queryAllByText(staticUser.name.charAt(0))).toHaveLength(0);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
