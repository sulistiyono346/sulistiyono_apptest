import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import H3 from '../H3';

import {colors} from '../../theme/colors';
import {generateInitialName, isValidUrlImage} from '../../helper';

const Favorite = ({data, label, handleAction}) => {
  return (
    <View>
      {label && (
        <View style={styles.label}>
          <H3>{label}</H3>
        </View>
      )}
      {data.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.container}
          data={data}
          renderItem={({item, key}) => (
            <TouchableOpacity
              key={key}
              style={styles.itemContainer}
              activeOpacity={0.8}
              onPress={() => handleAction(item.id)}>
              {isValidUrlImage(item?.photo) ? (
                <Image
                  source={{
                    uri: isValidUrlImage(item?.photo)
                      ? item.photo
                      : 'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.titleWrapper}>
                  <Text style={styles.initialName}>
                    {generateInitialName(item?.firstName, item?.lastName)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(_, i) => String(i)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.labelEmpty}>
          <H3 color={colors.GREY50}>Favorite list is empty</H3>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  titleText: {
    fontWeight: '600',
    color: colors.BLACK,
  },

  itemContainer: {
    width: 104,
    height: 104,
    marginLeft: 12,
    borderRadius: 18,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colors.WHITE,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
  initialName: {
    color: colors.WHITE,
    fontWeight: '600',
    fontSize: 40,
    textAlign: 'center',
  },
  titleWrapper: {
    backgroundColor: colors.BLACK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 104,
    height: 104,
    borderRadius: 10,
  },
});

Favorite.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  handleAction: PropTypes.func,
};

Favorite.defaultProps = {
  data: [],
  label: '',
  handleAction: () => {},
};

export default Favorite;
