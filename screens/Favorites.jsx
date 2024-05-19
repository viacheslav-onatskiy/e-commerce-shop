import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../components';
import { COLORS } from '../constants';
import styles from './favorites.style';

const Favorites = ({ navigation }) => {
  const [favoritesData, setFavoritesData] = useState([]);

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);

      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        const favoritesArray = Object.values(favorites);

        setFavoritesData(favoritesArray);
      }
    } catch (error) {
      console.log('CheckFavorites error:', error);
    }
  };

  const deleteFavorites = async (product) => {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;

    let productId = product;

    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];

        checkFavorites();
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log('Error to add favorites:', error);
    }
  };

  useEffect(() => {
    checkFavorites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.title}>Favorites</Text>
      </View>

      <FlatList
        data={favoritesData}
        renderItem={({ item }) => (
          <View style={styles.favoriteContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.imageUrl }} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSupplier}>{item.supplier}</Text>
              <Text style={styles.itemPrice}>$ {item.price}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteFavorites(item.id)}>
              <SimpleLineIcons name="trash" size={24} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Favorites;
