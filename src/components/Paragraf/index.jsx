import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';

import {colors} from '../../theme/colors';

const Paragraf = ({fontWeight, color, children}) => {
  return (
    <Text style={styles.textParagraf({color, fontWeight})}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  textParagraf: ({color, fontWeight}) => ({
    color: color,
    fontWeight: fontWeight,
    fontSize: 12,
  }),
});

Paragraf.propTypes = {
  color: PropTypes.string,
  fontWeight: PropTypes.number,
};

Paragraf.defaultProps = {
  color: colors.BLACK,
  fontWeight: 400,
};

export default Paragraf;
