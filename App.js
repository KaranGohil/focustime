import React, {useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import {colors} from './src/utils/colors';
import {Focus} from './src/features/focus';
import {Timer} from './src/features/Timer';
import {FocusHistory} from './src/features/FocusHistory';

// SafeAreaView will make sure that code/component are always in the view 
// You can also use Platform but too much hard coding
// we are adding props to focus component. So, we can add feature to go to next page/screen

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
    {!currentSubject ? (
      <>
      <Focus addSubject={setCurrentSubject} /> 
      <FocusHistory history={history} />
      </>
    ) : (
    <Timer
      focusSubject={currentSubject}
      onTimerEnd={(subject) => {
        {/* This will keep add new subject to existing history(...history) array*/}
        setHistory([...history, subject])
      }}
      clearSubject={() => setCurrentSubject(null)} 
    />
    )}
    </SafeAreaView>
  );
}

//StatusBar will go to native code in the android phone and get the statusBar height and density pixel
// We have a code which works for both android and IOS. 
// IOS uses SafeAreaView and Android uses Platform/StatusBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.violet,
  }
});
