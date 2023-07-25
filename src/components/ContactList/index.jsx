import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import H1 from '../H1';
import H3 from '../H3';
import H2 from '../H2';
import Paragraf from '../Paragraf';

import {
  generateInitialName,
  isValidUrlImage,
  transformData,
} from '../../helper';

import {colors} from '../../theme/colors';

const ContactList = ({data, handleAction}) => {
  const result = data?.length > 0 ? transformData(data) : [];

  return (
    <View style={styles.contactListContainer}>
      {result.length > 0 ? (
        result.map((contact, key) => (
          <View key={key}>
            <View style={styles.headerList}>
              <H3>{contact.key}</H3>
            </View>
            {contact?.data?.length > 0 ? (
              contact?.data.map(item => (
                <TouchableOpacity
                  testID="contact-item"
                  style={styles.bodyContactList}
                  key={item.id}
                  onPress={() => handleAction(item.id)}>
                  <View
                    style={
                      isValidUrlImage(item?.photo)
                        ? styles.imageWrapper
                        : styles.titleWrapper
                    }>
                    {isValidUrlImage(item?.photo) ? (
                      <Image
                        source={{
                          uri: item.photo,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    ) : (
                      <H1 color={colors.WHITE}>
                        {generateInitialName(item?.firstName, item?.lastName)}
                      </H1>
                    )}
                  </View>
                  <View style={styles.contactLabel}>
                    <View style={styles.contactName}>
                      <H2>{`${item?.firstName} ${item?.lastName}`}</H2>
                    </View>
                    <View style={styles.contactAge}>
                      <Paragraf>{`Age ${item.age}`}</Paragraf>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>Maaf Data Kosong</Text>
            )}
          </View>
        ))
      ) : (
        <Text>Maaf Data Kosong</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactListContainer: {
    marginVertical: 8,
  },
  headerList: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: colors.GREY,
    borderRadius: 5,
  },

  bodyContactList: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleWrapper: {
    width: 53,
    height: 53,
    margin: 8,
    padding: 2,
    backgroundColor: colors.BLACK,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 53,
    height: 53,
    margin: 8,
    padding: 2,
    backgroundColor: colors.BLACK,
    borderRadius: 8,
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  contactLabel: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
  },
});

ContactList.propTypes = {
  data: PropTypes.array,
  handleAction: PropTypes.func,
};

ContactList.defaultProps = {
  data: [],
  handleAction: () => {},
};

export default ContactList;
