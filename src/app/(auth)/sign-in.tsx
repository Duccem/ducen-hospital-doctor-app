import google from '@/assets/icons/google.png';
import logo from '@/assets/images/icon.png';
import top from '@/assets/images/top-brand.png';
import Button from '@/src/lib/ui/components/button';
import { Input } from '@/src/lib/ui/components/input';
import { useSignIn } from '@clerk/clerk-expo';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, Text, View } from 'react-native';
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
    <ScrollView className="flex-1 bg-background-primary">
      <SafeAreaView>
        <View className="flex-1 bg-background-primary">
          <View className="flex relative justify-center items-center w-full h-[150px]">
            <Image source={top} className="w-full" resizeMode="contain"></Image>
            <View className="absolute bottom-[-5px] left-5">
              <Image
                source={logo}
                className="w-[60px] h-[60px] mb-3"
                resizeMode="contain"
              ></Image>
              <Text className="text-3xl font-semibold text-foreground-secondary">
                Hello, welcome to Helsa
              </Text>
              <Text className="text-xl font-normal text-foreground-secondary">
                Let's get started
              </Text>
            </View>
          </View>
          <View className="px-5 py-5 mt-10">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="Email"
                  labelStyle="text-sm"
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
                  labelStyle="text-sm"
                  Icon={() => <FontAwesomeIcon icon={faLock} />}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />
            <Button
              title="Next step"
              className="mt-4"
              onPress={handleSubmit(onSubmit, console.log)}
            />
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
              <View className="flex-1 h-[1px] bg-foreground-primary" />
              <Text className="text-lg">Or</Text>
              <View className="flex-1 h-[1px] bg-foreground-primary" />
            </View>
            <Button
              title="Log In with Google"
              variant={'outline'}
              className=""
              Left={() => (
                <Image
                  source={google}
                  className="w-5 h-5 mx-6"
                  resizeMode="contain"
                />
              )}
            />
            <Link
              href={'/(auth)/sign-up'}
              className="text-lg text-center text-foreground-secondary mt-10"
            >
              <Text className="text-foreground-secondary">
                Don`t have an account?
              </Text>
              <Text className="text-brand-primary"> Sing Up</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignInForm;
