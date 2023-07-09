import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import {AppBar, H1, H3} from '../../components';
import {colors} from '../../theme/colors';
import {icon} from '../../theme/icons';

import {handleDeleteContact} from '../../store/action/contact/removeContact';
import {handleUpdateContact} from '../../store/action/contact/updateContact';
import {handleContactDetail} from '../../store/action/contact_detail/detailContact';
import {handleGetContactList} from '../../store/action/contact/getContactList';

import {
  checkIsFavorite,
  generateInitialName,
  isValidUrlImage,
} from '../../helper';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

function DetailContact({navigation}) {
  const route = useRoute();
  const idContact = route.params;
  const dispatch = useDispatch();
  const [masterData, setMasterData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [favData, setFavData] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const {contactList} = useSelector(
    ({ContactReducer}) => ({
      contactList: ContactReducer.contactList,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const getFavData = async () => {
      try {
        const favData = await AsyncStorage.getItem('favorite');
        if (favData !== null) {
          const tempFav = JSON.parse(favData);
          const ischeckFav = checkIsFavorite(tempFav, idContact.id);

          setIsFav(ischeckFav);
          setFavData(tempFav);
        } else {
          setIsFav(false);
        }
      } catch (e) {
        // error reading value
      }
    };
    getFavData();
    dispatch(handleContactDetail(idContact.id))
      .then(({data}) => {
        setMasterData(data);
        setFirstName(data?.firstName || '');
        setLastName(data?.lastName || '');
        setAge(String(data?.age) || '');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Failed to remove spesific contact, :)',
        });
      });
  }, [idContact]);

  const handleLeftAction = () => {
    if (isEdit) {
      setIsEdit(false);
      setFirstName(masterData?.firstName || '');
      setLastName(masterData?.lastName || '');
      setAge(String(masterData?.age) || '');
    } else {
      navigation.goBack(null);
      dispatch(handleGetContactList());
    }
  };

  const handleRightAction = () => {
    if (isEdit) {
      const payload = {
        ...masterData,
        firstName: firstName,
        lastName: lastName,
        age: Number(age),
      };
      const updateMasterData = () => {
        setMasterData(payload);
      };
      dispatch(handleUpdateContact(payload, Toast, updateMasterData));

      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  const handleShare = async () => {
    if (!isEdit) {
      const shareContact = `First Name\n${firstName} \n\nLast Name \n${lastName} \n\nAge \n${age}`;
      try {
        const result = await Share.share({
          message: shareContact,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error?.message,
        });
      }
    }
  };

  const handleDelete = () => {
    const nav = () => {
      navigation.goBack(null);
    };
    dispatch(handleDeleteContact(masterData.id, nav, Toast));
  };

  const handleAddFav = async () => {
    try {
      const newFav = [...favData, masterData];
      await AsyncStorage.setItem('favorite', JSON.stringify(newFav));
      setIsFav(true);
      Toast.show({
        type: 'success',
        text1: `Success add favorite`,
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: `Failed to add Favorite`,
      });
    }
  };

  const handleDeleteFav = async () => {
    try {
      if (checkIsFavorite(favData, masterData.id)) {
        try {
          const newFav = favData.filter(val => val.id !== masterData.id);
          await AsyncStorage.setItem('favorite', JSON.stringify(newFav));
          setIsFav(false);
          Toast.show({
            type: 'success',
            text1: `Success remove favorite`,
          });
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: `Failed to remove favorite`,
          });
        }
      }

      setIsFav(false);
    } catch (e) {
      // error reading value
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <AppBar
        leftIcon={
          isEdit ? (
            <H1 color={colors.RED_PRIMARY}>Cancel</H1>
          ) : (
            <View style={styles.leftIconWrapper}>
              <Image source={icon.iconArrowLeft} style={styles.icon} />
            </View>
          )
        }
        rightIcon={
          isEdit ? (
            <H1 color={colors.BLUE_PRIMARY}>Save</H1>
          ) : (
            <View style={styles.rightIconWrapper}>
              <Image source={icon.iconEdit} style={styles.icon} />
            </View>
          )
        }
        leftAction={handleLeftAction}
        rightAction={handleRightAction}
      />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.body}>
          <View style={styles.contactImageWrapper}>
            {isValidUrlImage(masterData?.photo) ? (
              <View style={styles.contactImage}>
                <Image
                  source={{
                    uri: masterData?.photo,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.titleWrapper}>
                <Text style={styles.initialName}>
                  {generateInitialName(firstName, lastName)}
                </Text>
              </View>
            )}
            <View style={styles.contactNameWrapper}>
              <H1>
                {firstName || ''} {lastName || ''}
              </H1>
            </View>
            <View style={styles.shareWrapper}>
              <TouchableOpacity
                style={styles.shareIcon}
                onPress={() => handleShare()}>
                <Image source={icon.iconChat} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadIcon}
                onPress={() => handleDownload()}>
                <Image source={icon.iconDownload} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => (!isFav ? handleAddFav() : {})}>
                <Image source={icon.iconFavorite} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerList}></View>

          <View style={styles.editTableWrapper}>
            <View style={styles.labelWrapper}>
              <View style={styles.label}>
                <H3>Fisrt Name</H3>
              </View>
              <TextInput
                editable={isEdit}
                value={firstName}
                style={styles.input}
                placeholder="First Name"
                onChangeText={val => {
                  setFirstName(val);
                }}
              />
            </View>
            <View style={styles.labelWrapper}>
              <View style={styles.label}>
                <H3>Last Name</H3>
              </View>
              <TextInput
                editable={isEdit}
                value={lastName}
                style={styles.input}
                placeholder="Last Name"
                onChangeText={val => {
                  setLastName(val);
                }}
              />
            </View>
            <View style={styles.labelWrapper}>
              <View style={styles.label}>
                <H3>Age</H3>
              </View>
              <TextInput
                keyboardType="numeric"
                editable={isEdit}
                value={age}
                style={styles.input}
                placeholder="age"
                onChangeText={val => {
                  setAge(val);
                }}
              />
            </View>
            {isEdit && (
              <>
                {isFav ? (
                  <TouchableOpacity
                    style={styles.deleteWrapper}
                    onPress={handleDeleteFav}>
                    <View style={styles.label}>
                      <H3 color={colors.RED_PRIMARY}>Delete Favorite </H3>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}

                <TouchableOpacity
                  style={styles.deleteWrapper}
                  onPress={handleDelete}>
                  <View style={styles.label}>
                    <H3 color={colors.RED_PRIMARY}>Delete Contact </H3>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    display: 'flex',
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  body: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  scrollContent: {
    height: deviceHeight,
  },
  headerList: {
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: colors.GREY,
    borderRadius: 5,
    height: 30,
  },
  leftIconWrapper: {
    paddingVertical: 5,
    borderColor: colors.GREY,
    paddingHorizontal: 5,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  rightIconWrapper: {
    paddingVertical: 5,
    backgroundColor: colors.BLUE_PRIMARY,
    borderColor: colors.BLUE_PRIMARY,
    paddingHorizontal: 5,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  input: {
    fontSize: 14,
    color: colors.GREY50,
  },
  contactImageWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  contactImage: {
    width: 104,
    height: 104,
  },
  icon: {
    width: 24,
    height: 24,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
  shareWrapper: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  shareIcon: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.GREEN_SUCCESS,
    borderColor: colors.GREEN_SUCCESS,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  downloadIcon: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.BLUE_PRIMARY,
    borderColor: colors.BLUE_PRIMARY,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  favoriteIcon: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.RED_PRIMARY,
    borderColor: colors.RED_PRIMARY,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  contactNameWrapper: {
    marginBottom: 5,
    marginTop: 15,
  },
  listWrapper: {
    paddingVertical: 5,
  },
  labelWrapper: {
    borderRadius: 5,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: colors.GREY50,
  },
  deleteWrapper: {
    marginTop: 20,
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

export default DetailContact;
