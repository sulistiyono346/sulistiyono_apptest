import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {handleGetContactList} from '../../store/action/contact/getContactList';
import {AppBar, ContactList, Favorite, SearchInput} from '../../components';
import {colors} from '../../theme/colors';
import {icon} from '../../theme/icons';
import {setContactList} from '../../store/action/contact';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

function Contact({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [favData, setFavData] = useState([]);

  const {contactListMaster, contactList} = useSelector(
    ({ContactReducer}) => ({
      contactListMaster: ContactReducer.contactListMaster,
      contactList: ContactReducer.contactList,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(handleGetContactList());
  }, []);
  useEffect(() => {
    if (isFocused) {
      const getFavData = async () => {
        try {
          const favData = await AsyncStorage.getItem('favorite');
          if (favData !== null) {
            setFavData(JSON.parse(favData));
          } else {
            setFavData([]);
          }
        } catch (e) {
          // error reading value
        }
      };
      getFavData();
    }
  }, [dispatch, isFocused]);

  const handleNewContact = () => {
    navigation.navigate('NewContact');
  };

  const handleSearch = val => {
    const newData = contactListMaster.filter(item =>
      item.search.toLowerCase().includes(val.toLowerCase()),
    );
    setSearch(val);

    dispatch(setContactList(newData));
  };

  return (
    <View style={styles.container}>
      <AppBar
        title="Contatcs"
        rightIcon={
          <View style={styles.rightIconWrapper}>
            <Image source={icon.iconEdit} style={styles.icon} />
          </View>
        }
        rightAction={handleNewContact}
      />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.body}>
          <SearchInput value={search} onChangeText={val => handleSearch(val)} />
          <Favorite
            data={favData}
            label="Favorites :"
            handleAction={cb =>
              navigation.navigate('ContactDetail', {
                id: cb,
              })
            }
          />
          <ContactList
            data={contactList}
            handleAction={cb =>
              navigation.navigate('ContactDetail', {
                id: cb,
              })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    display: 'flex',
    backgroundColor: colors.WHITE,
  },
  body: {
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  scrollContent: {
    height: deviceHeight,
  },
  rightIconWrapper: {
    paddingVertical: 5,
    backgroundColor: colors.BLUE_PRIMARY,
    borderColor: colors.BLUE_PRIMARY,
    paddingHorizontal: 5,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Contact;
