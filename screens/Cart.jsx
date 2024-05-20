import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CartTile } from '../components';
import { SIZES } from '../constants';
import useFetchCart from '../hooks/useFetchCart';
import styles from './cart.style';

function Cart({ navigation }) {
  const { data, isLoading, error, refetchCartData } = useFetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);

  console.log('123data:', data);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.title}>Cart</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} />
      ) : data?.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CartTile
              onPress={() => {
                setSelect(!select), setSelected(item);
              }}
              select={select}
              item={item}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

export default Cart;
