import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../utils/colors';
import {RoundedButton} from '../components/RoundedButton';
import {spacing} from '../utils/sizes';

// OnPress we will be sending current state of subject
// This will help trigger the next screen subject 
// If we add style in roundedbutton component, it will center the title!
//Therefore, we have to wrap the roundedbutton with view and add style to the view
// This is the state for the input text box  
export const Focus = ({addSubject}) => {
  const [subject, SetSubject] = useState(null);
  
  return(
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput style={styles.textInput} onChangeText={SetSubject} label="What would you like to focus on?"/>
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={() => addSubject(subject)} />
        </View>
    </View>
  </View>


)}

// if you are using two style together and both have flex: 1 then it will center the component in the center
// That's why we are using flex: 0.5 in the inputContainer and justifyContent: Top
const styles = StyleSheet.create({
  // This will auto adjust the component and only take up space which is needed
  container: {
  },
  button:{
    justifyContent: 'center'
  },
  textInput:{
    flex: 1,
    // marginRight is used to keep space between two component (Don't use PaddingRight because it won't have any effect)
    marginRight: spacing.sm,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    // flexDirection row will put all the component in the input container in a "row"
    flexDirection: 'row'
  }
})