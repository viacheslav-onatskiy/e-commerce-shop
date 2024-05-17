import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

const Button = ({ title, onPress, isValid }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container(isValid === false ? COLORS.gray : COLORS.primary)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    height: 50,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  }),
  title: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontSize: 18,
  },
});
