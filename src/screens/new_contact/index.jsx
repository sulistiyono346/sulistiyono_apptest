import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

import {AppBar, H1, H3} from '../../components';
import {colors} from '../../theme/colors';
import {icon} from '../../theme/icons';

import {generateInitialName} from '../../helper';
import {handleAddContact} from '../../store/action/contact/addContact';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

function NewContact({navigation}) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [initialName, setInitialName] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const initName = generateInitialName(firstName, lastName);
    setInitialName(initName);
    if (firstName && lastName && age) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [firstName, lastName, age]);
  const handleLeftAction = () => {
    navigation.goBack(null);
  };
  const handleShare = async () => {
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
      Alert.alert(error.message);
    }
  };

  const hanldeAddNewContact = () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      age: Number(age),
      photo: 'N/A',
    };
    dispatch(handleAddContact(payload, Toast));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <AppBar
        leftIcon={
          <View style={styles.leftIconWrapper}>
            <Image source={icon.iconArrowLeft} style={styles.icon} />
          </View>
        }
        leftAction={handleLeftAction}
      />

      <View style={styles.body}>
        <View style={styles.contactImageWrapper}>
          <View style={styles.contactImage}>
            <Text style={styles.initialName}>{initialName}</Text>
          </View>
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
              onPress={() => handleShare()}>
              <Image source={icon.iconDownload} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.favoriteIcon}>
              <Image source={icon.iconFavorite} style={styles.icon} />
            </View>
          </View>
        </View>
        <View style={styles.headerList}></View>

        <View style={styles.editTableWrapper}>
          <View style={styles.labelWrapper}>
            <View style={styles.label}>
              <H3>Fisrt Name</H3>
            </View>
            <TextInput
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
              value={age}
              style={styles.input}
              placeholder="age"
              onChangeText={val => {
                setAge(val);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={hanldeAddNewContact}>
            <View style={styles.label}>
              <H3 color={isDisable ? colors.GREY : colors.RED_PRIMARY}>
                Save Contact
              </H3>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 100,
    minHeight: deviceHeight,
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
    backgroundColor: colors.BLACK,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
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
    backgroundColor: colors.GREY,
    borderColor: colors.GREY,
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
  buttonWrapper: {
    marginTop: 20,
  },
  initialName: {
    color: colors.WHITE,
    fontWeight: '600',
    fontSize: 40,
    textAlign: 'center',
  },
});

export default NewContact;
