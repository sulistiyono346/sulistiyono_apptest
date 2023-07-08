import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';

import {colors} from '../../theme/colors';

const H3 = ({fontWeight, color, children}) => {
  return <Text style={styles.textH3({color, fontWeight})}>{children}</Text>;
};

const styles = StyleSheet.create({
  textH3: ({color, fontWeight}) => ({
    color: color,
    fontWeight: fontWeight,
    fontSize: 14,
  }),
});

H3.propTypes = {
  color: PropTypes.string,
  fontWeight: PropTypes.number,
};

H3.defaultProps = {
  color: colors.BLACK,
  fontWeight: 600,
};

export default H3;
