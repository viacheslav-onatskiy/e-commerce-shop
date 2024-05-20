import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SIZES.width - 50,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    letterSpacing: 4,
    marginLeft: 40,
    marginTop: 9,
  },
  favoriteContainer: (bgColor = '#FFF') => ({
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: bgColor,
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary,
  }),
  imageContainer: {
    width: 70,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  itemTitle: {
    fontFamily: 'bold',
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
  itemSupplier: {
    fontFamily: 'regular',
    color: COLORS.gray,
    fontSize: 14,
  },
  itemPrice: {
    fontFamily: 'semibold',
    color: COLORS.gray,
    fontSize: 14,
  },
  productText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontFamily: 'bold',
  },
  supplier: {
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    fontFamily: 'regular',
    marginTop: 3,
    textTransform: 'capitalize',
  },
  deleteButtonContainer: {
    paddingBottom: 20,
    paddingLeft: 75,
  },
});

export default styles;
