import { Fontisto, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import styles from './home.style';

function Home() {
  return (
    <SafeAreaView style={{ marginTop: 40 }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="locate-outline" size={24} />

          <Text style={styles.location}>Canada Vancouver</Text>

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
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
