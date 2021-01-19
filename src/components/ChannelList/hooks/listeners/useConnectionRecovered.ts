import { useEffect } from 'react';

import { useChatContext } from '../../../../contexts/chatContext/ChatContext';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../../../types/types';

type Parameters = {
  setForceUpdate: React.Dispatch<React.SetStateAction<number>>;
};

export const useConnectionRecovered = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>({
  setForceUpdate,
}: Parameters) => {
  const { client } = useChatContext<At, Ch, Co, Ev, Me, Re, Us>();

  useEffect(() => {
    const handleEvent = () => {
      setForceUpdate((count) => count + 1);
    };

    client.on('connection.recovered', handleEvent);
    return () => client.off('connection.recovered', handleEvent);
  }, []);
};
