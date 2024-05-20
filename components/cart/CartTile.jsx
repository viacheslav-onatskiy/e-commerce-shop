import { AntDesign } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants';
import styles from '../../screens/favorites.style';

const CartTile = ({ item, onPress, select }) => {
  return (
    <TouchableOpacity
      style={styles.favoriteContainer(!select ? '#FFF' : COLORS.secondary)}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.cartItem?.imageUrl }} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.productText}>
          {item.cartItem?.title}
        </Text>
        <Text numberOfLines={1} style={styles.supplier}>
          {item.cartItem?.supplier}
        </Text>
        <Text numberOfLines={1} style={styles.supplier}>
          {item.cartItem?.price} * {item.quantity}
        </Text>
      </View>

      <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => {}}>
        <AntDesign name="delete" size={18} color={COLORS.red} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CartTile;
