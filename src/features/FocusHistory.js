import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {colors} from '../utils/colors';
import {fontSizes, spacing} from '../utils/sizes';

//TODO: add data and time to each item

export const FocusHistory = ({ history }) => {

  if(!history || !history.length) return null;

  // This is kinda of a format in which a list of array data will show on the screen
  const renderItem = ({item}) => <Text style={styles.item}>- {item}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // if we apply flex: 1 it will take up spacing given to component 
  // it will allow it to scroll as well.
  container:{
    padding: spacing.md,
    flex: 1,
  },
  item:{
    fontSize: fontSizes.md,
    color: colors.white,
    paddingTop: spacing.sm
  },
  title: {
    color: colors.white,
    fontSize : fontSizes.md,
    fontWeight: "bold"
  }
})