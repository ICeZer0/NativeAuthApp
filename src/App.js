// @flow

import 'react-native-gesture-handler';
import React, {useEffect, useContext, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import SignInScreen from './screens/auth/signInScreen';
import SignUpScreen from './screens/auth/signUpScreen';
import SplashScreen from './screens/splashScreen';
import AppInit from './AppInit';

import AsyncStorage from '@react-native-community/async-storage';
import {stateConditionString} from './utils/helpers';
import {AuthContext} from './utils/authContext';
import {reducer, initialState} from './reducer';

const Stack = createStackNavigator();

const createHomeStack = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={AppInit}
        initialParams={{singOut: signOut}}
      />
    </Stack.Navigator>
  );
};

export default App = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  // In a production app, we need to send some data (usually username, password) to server and get a token
  // We will also need to handle errors if sign in failed
  // After getting token, we need to persist the token using `AsyncStorage`
  const authContextValue = useMemo(
    () => ({
      signIn: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          dispatch({type: 'SIGN_IN', token: 'Token-For-Now'});
        } else {
          dispatch({type: 'TO_SIGNIN_PAGE'});
        }
      },
      signOut: async (data) => {
        dispatch({type: 'SIGN_OUT'});
      },

      signUp: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          dispatch({type: 'SIGNED_UP', token: 'dummy-auth-token'});
        } else {
          dispatch({type: 'TO_SIGNUP_PAGE'});
        }
      },
    }),
    [],
  );

  const chooseScreen = (state) => {
    let navigateTo = stateConditionString(state);
    let arr = [];

    switch (navigateTo) {
      case 'LOAD_APP':
        arr.push(<Stack.Screen name="Splash" component={SplashScreen} />);
        break;

      case 'LOAD_SIGNUP':
        arr.push(
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: 'Sign Up',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />,
        );
        break;
      case 'LOAD_SIGNIN':
        arr.push(<Stack.Screen name="SignIn" component={SignInScreen} />);
        break;

      case 'LOAD_HOME':
        arr.push(
          <Stack.Screen
            name="Home"
            component={createHomeStack}
            options={{
              title: 'Home Screen Parent',
              headerStyle: {backgroundColor: 'black'},
              headerTintColor: 'white',
            }}
          />,
        );
        break;
      default:
        arr.push(<Stack.Screen name="SignIn" component={SignInScreen} />);
        break;
    }
    return arr[0];
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
