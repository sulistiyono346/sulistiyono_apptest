import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Dimensions, TextInput} from 'react-native';

import {colors} from '../../theme/colors';

const {width: deviceWidth} = Dimensions.get('window');

const Search = ({value, onChangeText}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={value}
        style={styles.input}
        placeholder="Search"
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  searchIcon: {
    width: 14,
    height: 14,
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 8,
    paddingLeft: 10,
  },
  input: {
    borderRadius: 10,
    height: 40,
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.GREY,
    color: colors.GREY50,
    fontSize: 14,
  },
});

Search.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

Search.defaultProps = {
  value: '',
  onChangeText: () => {},
};

export default Search;
