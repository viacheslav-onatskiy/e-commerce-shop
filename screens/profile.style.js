import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 290,
    width: '100%',
    resizeMode: 'cover',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 3,
    resizeMode: 'cover',
    marginTop: -90,
  },
  profileName: {
    fontFamily: 'bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderWidth: 0.7,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xxLarge,
  },
  buttonText: {
    fontFamily: 'semibold',
    color: COLORS.gray,
    fontWeight: '600',
    marginHorizontal: 20,
    fontSize: 14,
    lineHeight: 26,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
  menuText: {
    fontFamily: 'regular',
    color: COLORS.gray,
    marginHorizontal: 20,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
  },
});

export default styles;
