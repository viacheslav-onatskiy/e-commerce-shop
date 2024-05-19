import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { BackButton, Button } from '../components';
import { COLORS } from '../constants';
import styles from './login.style';

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Provide a valid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
  });

  const invalidFormAlert = () => {
    Alert.alert('Invalid Form', 'Please provide all required fields', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Continue',
        onPress: () => {},
      },
    ]);
  };

  const login = async (values) => {
    setLoader(true);

    try {
      // const endpoint = `http://localhost:5000/api/login`;
      const endpoint = 'http://10.0.0.221:5000/api/login';
      const data = values;

      const response = await axios.post(endpoint, data);

      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);

        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );

        await AsyncStorage.setItem('id', JSON.stringify(responseData._id));
        await AsyncStorage.setItem('token', JSON.stringify(responseData.token));

        navigation.replace('Bottom Navigation');
      } else {
        Alert.alert('Error Logging In', 'Please provide valid credentials', [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Continue',
            onPress: () => {},
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Oops, Error logging in, please try again', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Continue',
          onPress: () => {},
        },
      ]);
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackButton onPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.loginImage}
          />

          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
              touched,
            }) => (
              <View>
                <View style={styles.wrapperInput}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => {
                        setFieldTouched('email');
                      }}
                      onBlur={() => {
                        setFieldTouched('email', '');
                      }}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapperInput}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      secureTextEntry={obscureText}
                      placeholder="Enter password"
                      onFocus={() => {
                        setFieldTouched('password');
                      }}
                      onBlur={() => {
                        setFieldTouched('password', '');
                      }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />

                    <TouchableOpacity
                      onPress={() => setObscureText(!obscureText)}
                    >
                      <MaterialCommunityIcons
                        name={obscureText ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <Button
                  onPress={isValid ? handleSubmit : invalidFormAlert}
                  title={'L O G I N'}
                  isValid={isValid}
                  loader={loader}
                />

                <Text
                  style={styles.registerText}
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
