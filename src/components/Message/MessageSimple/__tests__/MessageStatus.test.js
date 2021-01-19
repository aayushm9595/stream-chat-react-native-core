import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react-native';

import { generateMessage } from 'mock-builders/generator/message';
import { generateStaticUser, generateUser } from 'mock-builders/generator/user';
import { getTestClientWithUser } from 'mock-builders/mock';

import { MessageStatus } from '../MessageStatus';

import { Chat } from '../../../Chat/Chat';

import { Streami18n } from '../../../../utils/Streami18n';

let chatClient;
let id;
let i18nInstance;

describe('MessageStatus', () => {
  beforeAll(async () => {
    id = 'testID';
    chatClient = await getTestClientWithUser({ id });
    i18nInstance = new Streami18n();
  });
  afterEach(cleanup);

  it('should render message status with spacer', async () => {
    const user = generateUser();
    const message = generateMessage({ user });

    const { getByTestId } = render(
      <Chat client={chatClient} i18nInstance={i18nInstance}>
        <MessageStatus
          lastReceivedId={message.id}
          message={message}
          readBy={[{ id }]}
        />
      </Chat>,
    );

    await waitFor(() => {
      expect(getByTestId('spacer')).toBeTruthy();
    });
  });

  it('should render message status with delivered container', async () => {
    const user = generateUser();
    const message = generateMessage({ user });

    const { getByTestId } = render(
      <Chat client={chatClient} i18nInstance={i18nInstance}>
        <MessageStatus
          lastReceivedId={message.id}
          message={{ ...message, status: 'received' }}
          readBy={[{ id }]}
        />
      </Chat>,
    );

    await waitFor(() => {
      expect(getByTestId('delivered-container')).toBeTruthy();
    });
  });

  it('should render message status with read by container', async () => {
    const user = generateUser();
    const message = generateMessage({ user });

    const { getByTestId, getByText, rerender, toJSON } = render(
      <Chat client={chatClient} i18nInstance={i18nInstance}>
        <MessageStatus
          lastReceivedId={message.id}
          message={message}
          readBy={[{ id }, { id: user.id, name: user.name }]}
        />
      </Chat>,
    );

    await waitFor(() => {
      expect(getByTestId('avatar-text')).toBeTruthy();
      expect(getByTestId('read-by-container')).toBeTruthy();
      expect(getByText(user.name.charAt(0))).toBeTruthy();
    });

    const staticUser = generateStaticUser(0);
    const staticMessage = generateMessage({ staticUser });

    rerender(
      <Chat client={chatClient} i18nInstance={i18nInstance}>
        <MessageStatus
          lastReceivedId={staticMessage.id}
          message={staticMessage}
          readBy={[
            { id },
            {
              id: staticUser.id,
              image: staticUser.image,
              name: staticUser.name,
            },
          ]}
        />
      </Chat>,
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
      expect(getByTestId('avatar-image')).toBeTruthy();
      expect(getByTestId('read-by-container')).toBeTruthy();
    });
  });

  it('should render message status with sending container', async () => {
    const user = generateUser();
    const message = generateMessage({ user });

    const { getByTestId } = render(
      <Chat client={chatClient} i18nInstance={i18nInstance}>
        <MessageStatus message={{ ...message, status: 'sending' }} />
      </Chat>,
    );

    await waitFor(() => {
      expect(getByTestId('sending-container')).toBeTruthy();
    });
  });
});
