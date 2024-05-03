import { FlatList, View } from 'react-native';
import { SIZES } from '../../constants';
import ProductCartView from './ProductCartView';
import styles from './productRow.style';

const ProductRow = () => {
  const products = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCartView item={item} />}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
    </View>
  );
};

export default ProductRow;
