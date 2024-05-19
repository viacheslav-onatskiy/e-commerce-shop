import { ActivityIndicator, FlatList, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { useFetch } from '../../hooks';
import ProductCartView from './ProductCartView';
import styles from './productRow.style';

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCartView item={item} />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default ProductRow;
