import React, {useState} from "react";
import {View, StyleSheet, Text, Vibration} from "react-native";
import {ProgressBar} from "react-native-paper";
import {Countdown} from "../components/Countdown";
import {RoundedButton} from "../components/RoundedButton";
import {spacing} from "../utils/sizes";
import {colors} from "../utils/colors";
import {Timing} from "./Timing";
// an library which will make sure that you phone will start awake when the app is open
import { useKeepAwake } from 'expo-keep-awake';

//TODO: in the future, add a button which remove vibration

 const ONE_SECOND_IN_MS = 1000;
// (for IOS) there will be vibration after each second (5 times)
// (for android) it will repeat on odd indices
// So, it will only vibration on 1st, 3rd and 5th second (according to the pattern below)
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS
  ];

  

export const Timer = ({focusSubject, clearSubject, onTimerEnd}) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    // resetting everything (i.e button, timer)
    // will reset the pause button to start
    setIsStarted(false);
    // will fill the progress bar how it is in the starting
    setProgress(1);
    // this will reset the timer
    reset();
    // This will pass the focusSubject up to parent component
    onTimerEnd(focusSubject);
  }
  return(
  <View style={styles.container}>
    <View style={styles.countdown}>
      <Countdown 
      minutes={minutes}
      isPaused={!isStarted} 
      onProgress={setProgress} 
      onEnd={onEnd} />
      {/* this will add a little view between countdown and roundedbutton
    we need paddingTop with spacing xxl to make the view bigger */}
      <View style={{paddingTop: spacing.xxl}}>
      <Text style={styles.title}>Focusing on:</Text>
      <Text style={styles.task}>{focusSubject}</Text>
      </View>
    </View>
    <View style={{paddingTop: spacing.sm}}>
      <ProgressBar
        progress={progress}
        color={colors.progressBar}
        style={{height: spacing.sm}}
       />
    </View>
    <View style={styles.timingWrapper}>
      <Timing onChangeTime={setMinutes} />
    </View>
    <View style={styles.buttonWrapper}>
    {!isStarted && (
      <RoundedButton title="start" onPress={() => setIsStarted(true)} />
    )}
    {isStarted && (
      <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
    )}
    </View>
    <View style={styles.clearSubjectWrapper}>
      <RoundedButton size={50} title="-" onPress={clearSubject} />
    </View>
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'

  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: "row",
    paddingTop: spacing.xxl,

  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: 'center',
  },
  clearSubjectWrapper:{
    flexDirection: "row",
    justifyContent: "center"
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: 'center'
  },
  task : {
    color: colors.white,
    textAlign: "center"
  }
})