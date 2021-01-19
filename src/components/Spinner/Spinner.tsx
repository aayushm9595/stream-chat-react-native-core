import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { styled } from '../../styles/styledComponents';

const AnimatedView = Animated.createAnimatedComponent(Animated.View);

const Circle = styled(AnimatedView)`
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  border-right-color: transparent;
  border-width: 2px;
  height: 30px;
  justify-content: center;
  margin: 5px;
  width: 30px;
  ${({ theme }) => theme.spinner.css};
`;

/**
 * @example ./Spinner.md
 */
export const Spinner: React.FC = () => {
  const rotateValue = useRef(new Animated.Value(0));

  const loop = Animated.loop(
    Animated.timing(rotateValue.current, {
      duration: 800,
      easing: Easing.linear,
      toValue: 1,
      useNativeDriver: true,
    }),
  );

  useEffect(() => {
    loop.start();
    return loop.stop;
  });

  return (
    <Circle
      style={{
        transform: [
          {
            rotate: rotateValue.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
    />
  );
};
