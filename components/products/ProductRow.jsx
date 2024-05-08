import { ActivityIndicator, FlatList, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import ProductCartView from './ProductCartView';
import styles from './productRow.style';

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();

  const data1 = [
    {
      _id: '1234',
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/gHVFUQbbDdiPzXs7qiY8dZ.jpg',
      title: 'title1',
      supplier: 'supplier1',
      price: 1234,
    },
    {
      _id: '12345',
      imageUrl:
        'https://media.designcafe.com/wp-content/uploads/2022/06/10101713/luxurious-bedroom-sofa-chair-with-table.jpg',
      title: 'title2',
      supplier: 'supplier2',
      price: 1234,
    },
    {
      _id: '12346',
      imageUrl:
        'https://www.ikea.com/ext/ingkadam/m/1aff1bdd4b0bc1c2/original/PH198080.jpg',
      title: 'title3',
      supplier: 'supplier3',
      price: 1234,
    },
    {
      _id: '1234744',
      imageUrl:
        'https://image.made-in-china.com/202f0j00jsNWudCcMGrq/Fabric-Single-Sofa-Balcony-Lounge-Chair-Bedroom-Living-Room-Sofa-with-Modern-Nordic-Simple-Fashion-Creative-Solid-Wood.jpg',
      title: 'title4',
      supplier: 'supplier4',
      price: 1234,
    },
  ];

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
