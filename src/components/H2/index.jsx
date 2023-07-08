import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';

import {colors} from '../../theme/colors';

const H2 = ({fontWeight, color, children}) => {
  return <Text style={styles.textH2({color, fontWeight})}>{children}</Text>;
};

const styles = StyleSheet.create({
  textH2: ({color, fontWeight}) => ({
    color: color,
    fontWeight: fontWeight,
    fontSize: 16,
  }),
});

H2.propTypes = {
  color: PropTypes.string,
  fontWeight: PropTypes.number,
};

H2.defaultProps = {
  color: colors.BLACK,
  fontWeight: 600,
};

export default H2;
