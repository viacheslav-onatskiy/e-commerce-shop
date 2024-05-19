import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { addToCart } from '../hooks';
import styles from './productDetails.style';

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFavoriteExists, setIsFavoriteExists] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    checkUser();
    checkFavorites();
  }, []);

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (id !== null) {
        setIsLoggedIn(true);
        console.log('user logged in:', isLoggedIn);
      } else {
        console.log('user not logged in:');
      }
    } catch (error) {}
  };

  const addToFavorites = async () => {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;

    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      imageUrl: item.imageUrl,
      product_location: item.product_location,
    };

    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];

        setIsFavoriteExists(false);
      } else {
        favoritesObj[productId] = productObj;

        setIsFavoriteExists(true);
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log('Error to add favorites:', error);
    }
  };

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);

      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);

        if (favorites[item._id]) {
          setIsFavoriteExists(true);
        }
      }
    } catch (error) {
      console.log('CheckFavorites error:', error);
    }
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    } else {
      addToFavorites();
    }
  };

  const handleBuy = () => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    } else {
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    } else {
      addToCart(item._id, count);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleFavorite()}>
          <Ionicons
            name={isFavoriteExists ? 'heart' : 'heart-outline'}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} size={24} name="star" color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.4)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>

            <Text style={styles.ratingText}>{count}</Text>

            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{item.product_location}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="location-outline" size={20}>
                <Text>Location City</Text>
              </Ionicons>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20}>
                <Text>Free Delivery</Text>
              </MaterialCommunityIcons>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => handleBuy()}
          >
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addCart}
            onPress={() => handleAddToCart()}
          >
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
