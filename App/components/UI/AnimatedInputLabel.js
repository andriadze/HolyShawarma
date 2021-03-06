import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Animated} from 'react-native';

import Colors from '../../Constants/Colors';

const AnimatedInputLabel = ({
  label,
  value,
  onChangeText,
  style,
  containerStyle,
  ...props
}) => {
  const [labelPositionAnim, setLabelPositionAnim] = useState(
    new Animated.Value(0),
  );
  const [focused, setFocused] = useState(false);

  const labelToTop = Animated.timing(labelPositionAnim, {
    toValue: 1,
    duration: 200,
    seNativeDriver: true,
  });

  useEffect(() => {
    if (!value) return;
    labelToTop.start();
  }, []);
  
  let transform = [
    {
      translateY: labelPositionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
      }),
    },
    {
      translateX: labelPositionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 15],
      }),
    },
  ];

  const focusHandler = () => {
    labelToTop.start();
    setFocused(true);
  };

  const blurHandler = () => {
    setFocused(false);
    if (value.trim()) return;
    labelPositionAnim.setValue(0);
  };

  return (
    <View style={containerStyle}>
      <Animated.Text
        style={{
          ...styles.label,
          transform,
          zIndex: focused || value.trim() ? 1 : 0,
          color: focused ? Colors.primary : Colors.authInactiveText,
        }}>
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          ...styles.input,
          ...style,
          borderColor: focused ? Colors.primary : Colors.authInactiveText,
        }}
        onFocus={focusHandler}
        onBlur={blurHandler}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    top: 10,
    left: 11.5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    fontSize: 12,
    color: Colors.primary,
    paddingHorizontal: 5
  },
  input: {
    borderColor: Colors.primary,
    borderRadius: 255,
    borderWidth: 1,
    paddingLeft: 16.5,
    height: 40,
  },
});

export default AnimatedInputLabel;
