import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contact from '../screens/contact';
import DetailContact from '../screens/detail_contact';
import NewContact from '../screens/new_contact';

const Stack = createNativeStackNavigator();

const RootNavigation = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Contact"
          component={Contact}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ContactDetail"
          component={DetailContact}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NewContact"
          component={NewContact}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
