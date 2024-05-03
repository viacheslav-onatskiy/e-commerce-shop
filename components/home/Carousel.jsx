import { StyleSheet, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS } from '../../constants';

const Carousel = () => {
  const slides = [
    'https://cdn.mos.cms.futurecdn.net/gHVFUQbbDdiPzXs7qiY8dZ.jpg',
    'https://media.designcafe.com/wp-content/uploads/2022/06/10101713/luxurious-bedroom-sofa-chair-with-table.jpg',
    'https://www.ikea.com/ext/ingkadam/m/1aff1bdd4b0bc1c2/original/PH198080.jpg',
    'https://image.made-in-china.com/202f0j00jsNWudCcMGrq/Fabric-Single-Sofa-Balcony-Lounge-Chair-Bedroom-Living-Room-Sofa-with-Modern-Nordic-Simple-Fashion-Creative-Solid-Wood.jpg',
  ];

  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{
          borderRadius: 15,
          width: '95%',
          marginTop: 15,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
