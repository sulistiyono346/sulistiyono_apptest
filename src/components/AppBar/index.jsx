import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';

import H1 from '../H1';

import {colors} from '../../theme/colors';
const {height} = Dimensions.get('window');

const AppBar = ({title, leftAction, rightAction, leftIcon, rightIcon}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftButtonView} onTouchEnd={leftAction}>
          {leftIcon}
        </View>
        <H1>{title}</H1>
        <View style={styles.rightButtonView} onTouchEnd={rightAction}>
          {rightIcon}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.07,
    display: 'flex',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.WHITE,
    backgroundColor: colors.WHITE,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
  },

  leftButtonView: {
    position: 'absolute',
    left: 0,
    paddingTop: 5,
  },

  rightButtonView: {
    position: 'absolute',
    right: 0,
    paddingTop: 5,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 4,
  },
});

AppBar.propTypes = {
  title: PropTypes.string,
  leftAction: PropTypes.func,
  rightAction: PropTypes.func,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
};

AppBar.defaultProps = {
  title: '',
  leftAction: () => {},
  rightAction: () => {},
  leftIcon: <></>,
  rightIcon: <></>,
};

export default AppBar;
