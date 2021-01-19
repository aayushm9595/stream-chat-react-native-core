import React from 'react';

import { styled } from '../../styles/styledComponents';

import type { Attachment } from 'stream-chat';

import type { ActionHandler } from './Attachment';
import type { DefaultAttachmentType, UnknownType } from '../../types/types';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  ${({ theme }) => theme.message.actions.container.css}
`;

const ActionButton = styled.TouchableOpacity<{ buttonStyle?: string }>`
  background-color: ${({ buttonStyle, theme }) =>
    buttonStyle === 'primary'
      ? theme.message.actions.button.primaryBackgroundColor
      : theme.message.actions.button.defaultBackgroundColor};
  border-color: ${({ buttonStyle, theme }) =>
    buttonStyle === 'primary'
      ? theme.message.actions.button.primaryBorderColor
      : theme.message.actions.button.defaultBorderColor};
  border-radius: 20px;
  border-width: 1px;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  ${({ theme }) => theme.message.actions.button.css}
`;

const ActionButtonText = styled.Text<{ buttonStyle?: string }>`
  color: ${({ buttonStyle, theme }) =>
    buttonStyle === 'primary'
      ? theme.message.actions.buttonText.primaryColor
      : theme.message.actions.buttonText.defaultColor};
  ${({ theme }) => theme.message.actions.buttonText.css}
`;

export type AttachmentActionsProps<
  At extends UnknownType = DefaultAttachmentType
> = Attachment<At> & {
  /** The handler to execute after selecting an action */
  actionHandler?: ActionHandler;
};

/**
 * AttachmentActions - The actions you can take on an attachment.
 * Actions in combination with attachments can be used to build [commands](https://getstream.io/chat/docs/#channel_commands).
 *
 * @example ./AttachmentActions.md
 */
export const AttachmentActions = <
  At extends UnknownType = DefaultAttachmentType
>(
  props: AttachmentActionsProps<At>,
) => {
  const { actionHandler, actions } = props;

  return (
    <Container testID='attachment-actions'>
      {actions?.map((action, index) => (
        <ActionButton
          buttonStyle={action.style}
          key={`${index}-${action.value}`}
          onPress={() => {
            if (action.name && action.value && actionHandler) {
              actionHandler(action.name, action.value);
            }
          }}
          testID={`attachment-actions-button-${action.name}`}
        >
          <ActionButtonText buttonStyle={action.style}>
            {action.text}
          </ActionButtonText>
        </ActionButton>
      ))}
    </Container>
  );
};
