import { Oauth } from '@/src/components/oauth';
import Button from '@/src/lib/ui/components/button';
import { Input } from '@/src/lib/ui/components/input';
import { useSignIn } from '@clerk/clerk-expo';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Activity } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { signIn, setActive, isLoaded } = useSignIn();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/(root)/(tabs)/home');
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.log(error);
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
          <View className="px-5 py-5 mt-10">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="Email"
                  labelStyle="text-lg"
                  Icon={() => <FontAwesomeIcon icon={faAt} />}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="Password"
                  secureTextEntry={true}
                  labelStyle="text-lg"
                  Icon={() => <FontAwesomeIcon icon={faLock} />}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />
            <Button
              title="Log In"
              titleStyle="text-lg"
              size={'lg'}
              className="mt-4"
              onPress={handleSubmit(onSubmit, console.log)}
            />
            <View className="flex flex-row justify-center items-center my-1 gap-x-3">
              <View className="flex-1 h-[1px] bg-foreground-primary" />
              <Text className="text-lg">Or</Text>
              <View className="flex-1 h-[1px] bg-foreground-primary" />
            </View>
            <Oauth title="Log In with Google" />
            <Link
              href={'/(auth)/sign-up'}
              className="text-lg text-center text-foreground-secondary mt-10"
            >
              <Text className="text-foreground-secondary font-NunitoMedium">
                Don`t have an account?
              </Text>
              <Text className="text-brand-primary font-NunitoMedium">
                {' '}
                Sing Up
              </Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignInForm;
