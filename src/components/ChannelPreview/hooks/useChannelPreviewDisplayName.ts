import { useEffect, useState } from 'react';

import { useChatContext } from '../../../contexts/chatContext/ChatContext';

import type { Channel, StreamChat } from 'stream-chat';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../../types/types';

const getChannelPreviewDisplayName = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  channel: Channel<At, Ch, Co, Ev, Me, Re, Us>,
  client: StreamChat<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const currentUserId = client?.user?.id;
  const channelName = channel?.data?.name;

  if (channelName) return channelName;

  const members = Object.values(channel.state?.members || {});
  const otherMembers = members.filter(
    (member) => member.user?.id !== currentUserId,
  );
  const name = otherMembers
    .map((member) => member.user?.name || member.user?.id || 'Unnamed User')
    .join(', ');

  return name;
};

export const useChannelPreviewDisplayName = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  channel: Channel<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const { client } = useChatContext<At, Ch, Co, Ev, Me, Re, Us>();

  const id = client?.user?.id;
  const members = channel.state?.members;
  const name = channel?.data?.name;

  const [displayName, setDisplayName] = useState(
    getChannelPreviewDisplayName(channel, client),
  );

  useEffect(() => {
    setDisplayName(getChannelPreviewDisplayName(channel, client));
  }, [id, members, name]);

  return displayName;
};
