import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';

import {colors} from '../../theme/colors';

const H1 = ({fontWeight, color, children}) => {
  return <Text style={styles.textH1({color, fontWeight})}>{children}</Text>;
};

const styles = StyleSheet.create({
  textH1: ({color, fontWeight}) => ({
    color: color,
    fontWeight: fontWeight,
    fontSize: 18,
  }),
});

H1.propTypes = {
  color: PropTypes.string,
  fontWeight: PropTypes.number,
};

H1.defaultProps = {
  color: colors.BLACK,
  fontWeight: 600,
};

export default H1;
