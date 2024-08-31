//import top from '@/assets/images/icon.png';
import { Oauth } from '@/src/components/oauth';
import Button from '@/src/lib/ui/components/button';
import { Input } from '@/src/lib/ui/components/input';
import { useCreateUserMutation } from '@/src/modules/auth/infrastructure/apollo/createUser';
import { useSignUp } from '@clerk/clerk-expo';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Activity, AtSign, Lock, UserRound } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Dimensions, ScrollView, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is too short' }),
  lastName: z.string().min(2, { message: 'Last name is too short' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password is too short' }),
});

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });
  const [verification, setVerification] = useState({
    code: '',
    state: '',
    error: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { createUser } = useCreateUserMutation();
  const { isLoaded, signUp, setActive } = useSignUp();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!isLoaded) return;

    try {
      console.log(`${data.firstName} ${data.lastName}`);
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerification({ ...verification, state: 'pending' });
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', error.errors[0].longMessage);
    }
  };
  const onVerify = async () => {
    if (!isLoaded) return;
    try {
      const completedSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      console.log(completedSignUp.status);
      if (completedSignUp.status === 'complete') {
        const values = getValues();
        await createUser({
          variables: {
            user: {
              id: uuid.v4(),
              email: values.email,
              externalId: completedSignUp.createdUserId,
              role: 'DOCTOR',
            },
          },
        });
        await setActive({ session: completedSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          state: 'error',
          error: 'Verification failed',
        });
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setVerification({
        ...verification,
        state: 'error',
        error: error.errors[0].longMessage,
      });
    }
  };

  return (
    <ScrollView
      className="bg-brand-primary flex-1 h-screen"
      style={{ height: Dimensions.get('screen').height }}
    >
      <SafeAreaView
        className="bg-brand-primary relative h-screen"
        style={{ height: Dimensions.get('screen').height }}
      >
        <View className="flex flex-row justify-center items-center absolute top-[60px] w-full">
          <Activity className="text-white mr-3" size={30} />
          <Text className="text-background-primary font-NunitoBold text-2xl">
            Ducen
          </Text>
        </View>
        <View className="h-full bg-background-third rounded-t-[40px] mt-[90px]">
          <View className="px-5 py-6 mt-">
            <Controller
              name="firstName"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="First name"
                  labelStyle="text-lg"
                  Icon={() => <UserRound className="w-4 h-4 text-black" />}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="Last name"
                  labelStyle="text-lg"
                  Icon={() => <UserRound className="w-4 h-4 text-black" />}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.lastName?.message}
                />
              )}
            />
            <Controller
              name="email"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="Email"
                  labelStyle="text-lg"
                  Icon={() => <AtSign className="w-4 h-4 text-black" />}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="Password"
                  labelStyle="text-lg"
                  secureTextEntry={true}
                  Icon={() => <Lock className="w-2 h-2 text-black" />}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />
            <Button
              title="Sign Up"
              className="mt-4"
              titleStyle="text-lg"
              size={'lg'}
              onPress={handleSubmit(onSubmit, console.log)}
            />
            <View className="flex flex-row justify-center items-center my-1 gap-x-3">
              <View className="flex-1 h-[1px] bg-foreground-primary" />
              <Text className="text-lg">Or</Text>
              <View className="flex-1 h-[1px] bg-foreground-primary" />
            </View>
            <Oauth title="Sign Up with Google" />
            <Link
              href={'/(auth)/sign-in'}
              className="text-lg text-center text-foreground-secondary mt-5"
            >
              <Text className="text-foreground-secondary font-NunitoMedium">
                Already have an account?
              </Text>
              <Text className="text-brand-primary font-NunitoMedium">
                {' '}
                Log In
              </Text>
            </Link>
          </View>
          <ReactNativeModal
            isVisible={verification.state === 'pending'}
            onModalHide={() => {
              if (verification.state === 'success') {
                setShowSuccessModal(true);
              }
            }}
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-2xl font-JakartaExtraBold mb-2">
                Verification
              </Text>
              <Text className="font-Jakarta mb-5">
                We've sent a verification code to your email.
              </Text>
              <Input
                label="Code"
                Icon={() => <FontAwesomeIcon icon={faLock} />}
                placeholder="12345"
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setVerification({ ...verification, code: value })
                }
              />
              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}
              <Button
                title="Verify Email"
                onPress={onVerify}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="bg-white px-7 py-9 rounded-2xl main-h-[300px]">
              <LottieView
                style={{
                  width: 200,
                  height: 200,
                  marginHorizontal: 'auto',
                  marginVertical: 5,
                }}
                speed={1.5}
                source={require('../../../assets/animations/success_animation.json')}
                autoPlay
                loop={false}
              />
              <Text className="text-3xl font-JakartaBold text-center">
                Verified
              </Text>
              <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                You have successfully verified your email
              </Text>
              <Button
                title="Browse Home"
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push('/(root)/(tabs)/home');
                }}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpForm;
