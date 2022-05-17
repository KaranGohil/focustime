import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
//If the time is less than 10 than it will add zero in front
// else it will (in the second section) it will show up as 9,8,7... instead of 09,08,07,..
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  // useRef is similar to useStatus but useRef will not cause rerender
  //useRef only returns one object which you can set to anything but when it changes it will not cause rerender
  //useRef is used to track the value of setInterval
  // why? so we can clear it. Incase, if we want to pause the timer or component is removed from the screen
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);

  // minutes are already set to 0.1 
  // but we need to setMillis which is using minutes
  // This is a smart way to write code and reduce redundancy
  const reset = () => setMillis(minutesToMillis(minutes))

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      // if the time is not zero then subtract 1000ms/1s from it
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

// onProgress needs a callback to tell the component where they at?
  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      // why this? we need to check if interval.current is given a value 
      // if we dont, there is a chance we can pass null value
      if (interval.current) clearInterval(interval.current);
      return;
    }
      // setInterval is a JS function which calls a function after every time set
      // Here, it will call countDown function every 1000ms/1s
    interval.current = setInterval(countDown, 1000);

    // If we remove this from screen, we need to clear. So, the app is using less memory
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
}); 