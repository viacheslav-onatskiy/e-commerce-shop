import { Fontisto, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import styles from './home.style';

function Home() {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log('Error retrieving the user data: ', error);
    }
  };

  useEffect(() => {
    checkExistingUser();
  });

  return (
    <SafeAreaView style={{ marginTop: 40 }}>
      <ScrollView>
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <Ionicons name="locate-outline" size={24} />

            <Text style={styles.location}>
              {userData?.location || 'Default Location'}
            </Text>

            <View style={{ alignItems: 'flex-end' }}>
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}> 9 </Text>
              </View>
              <TouchableOpacity>
                <Fontisto name="shopping-bag-1" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView>
          <Welcome />

          <Carousel />

          <Headings />

          <ProductRow />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
