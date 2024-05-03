import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
import styles from './productDetails.style';

const ProductDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: 'https://cdn.mos.cms.futurecdn.net/gHVFUQbbDdiPzXs7qiY8dZ.jpg',
        }}
        style={styles.image}
      />
    </View>
  );
};

export default ProductDetails;
