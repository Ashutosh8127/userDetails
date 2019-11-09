import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';


export default function Separator(props) {
  styles.customStyles = {
    marginLeft: props.marginLeft,
    backgroundColor: props.backgroundColor,
    height: props.height
  };
  return (
    <View style={styles.customStyles} />
  );
}

const styles = StyleSheet.create({
    
})
Separator.defaultProps = {
  marginLeft: 15,
  backgroundColor: '#E4E4E4',
  height: 1
};