import React, { FC } from 'react';
import { Animated, Dimensions, View as RNView } from 'react-native';

const { useState, useCallback, createRef } = React;
const { Image, View } = Animated;
const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const ParallaxImage: FC<{
  y?: Animated.AnimatedInterpolation;
  factor?: number;
  height?: number;
}> = ({ y, factor, height }) => {
  const [layout, setLayout] = useState<{
    offset: number;
    height: number;
    width: number;
  }>({
    offset: 0,
    height: 0,
    width: 0,
  });

  const viewRef = createRef<RNView>();

  const handleLayout = useCallback(
    ({ nativeEvent }): void => {
      console.log(nativeEvent.layout);

      viewRef.current?.measure((_, __, width, height, ___, py) => {
        setLayout({ offset: py, height, width });
      });
    },
    [viewRef]
  );

  const style =
    y && factor
      ? {
          transform: [
            {
              translateY: y.interpolate({
                inputRange: [
                  layout.offset - layout.height,
                  layout.offset + WINDOW_HEIGHT + layout.height,
                ],
                outputRange: [
                  -(layout.height * factor),
                  layout.height * factor,
                ],
              }),
            },
          ],
        }
      : {};

  return (
    <View
      ref={viewRef}
      onLayout={handleLayout}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height,
        backgroundColor: 'red',
        marginVertical: 20,
      }}
    >
      <Image
        source={{
          uri:
            'https://s31807.pcdn.co/wp-content/uploads/2020/02/Timothe%CC%81e-Chalamet-at-Little-Women-Premiere-in-Paris-scaled.jpg',
        }}
        style={[
          style,
          {
            flex: 1,
            width: undefined,
            height: undefined,
            alignSelf: 'stretch',
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};
ParallaxImage.defaultProps = {
  factor: 0.2,
  height: 500,
};
export default ParallaxImage;
