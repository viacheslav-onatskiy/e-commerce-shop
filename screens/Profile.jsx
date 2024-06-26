import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants';
import styles from './profile.style';

function Profile({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([userId, 'id']);

      navigation.replace('Bottom Navigation');
    } catch (error) {
      console.log('Error logging out the user: ', error);
    }
  };

  const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      { text: 'Continue', onPress: () => userLogout() },
      { defaultIndex: 1 },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to delete all saved data on your device?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Continue',
          onPress: () => {},
        },
        // { defaultIndex: 1 },
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Continue',
          onPress: () => {},
        },
        // { defaultIndex: 1 },
      ]
    );
  };

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Error retrieving the user data: ', error);
    }
  };

  useEffect(() => {
    checkExistingUser();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.gray} />

          <View style={{ width: '100%' }}>
            <Image
              source={require('../assets/images/space.jpg')}
              style={styles.cover}
            />
          </View>

          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/images/profile.jpeg')}
              style={styles.profile}
            />
            <Text style={styles.profileName}>
              {!!userLogin
                ? userData.username
                : 'Please login into your account'}
            </Text>

            {!userLogin ? (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={styles.loginBtn}>
                  <Text style={styles.buttonText}>L O G I N</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>{userData.email}</Text>
              </View>
            )}

            {!userLogin ? (
              <View></View>
            ) : (
              <View style={styles.menuWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Favorites')}
                >
                  <View style={styles.menuItem(0.3)}>
                    <MaterialCommunityIcons
                      name="heart-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Favorites</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                  <View style={styles.menuItem(0.3)}>
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Orders</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Cart Navigation')}
                >
                  <View style={styles.menuItem(0.37)}>
                    <SimpleLineIcons
                      name="bag"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Cart</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => clearCache()}>
                  <View style={styles.menuItem(0.3)}>
                    <MaterialCommunityIcons
                      name="cached"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Clear Cache</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteAccount()}>
                  <View style={styles.menuItem(0.3)}>
                    <AntDesign
                      name="deleteuser"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Delete Account</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => logout()}>
                  <View style={styles.menuItem(0.3)}>
                    <AntDesign name="logout" size={24} color={COLORS.primary} />
                    <Text style={styles.menuText}>Logout</Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.menuText}>Logout123</Text>
                <Text style={styles.menuText}>Logout123</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;
