import google from '@/assets/icons/google.png';
import logo from '@/assets/images/icon.png';
import top from '@/assets/images/top-brand.png';
import Button from '@/src/lib/ui/components/button';
import { Input } from '@/src/lib/ui/components/input';
import { faAt, faIdCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const SignUpForm = () => {
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
          <View className="px-5 py-5 mt-4">
            <Input
              label="First name"
              labelStyle="text-sm"
              Icon={() => <FontAwesomeIcon icon={faIdCard} />}
            />
            <Input
              label="Last name"
              labelStyle="text-sm"
              Icon={() => <FontAwesomeIcon icon={faIdCard} />}
            />
            <Input
              label="Email"
              labelStyle="text-sm"
              Icon={() => <FontAwesomeIcon icon={faAt} />}
            />
            <Input
              label="Password"
              secureTextEntry={true}
              labelStyle="text-sm"
              Icon={() => <FontAwesomeIcon icon={faLock} />}
            />
            <Button title="Next step" className="mt-4" />
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
              href={'/(auth)/sign-in'}
              className="text-lg text-center text-foreground-secondary mt-10"
            >
              <Text className="text-foreground-secondary">
                Already have an account?
              </Text>
              <Text className="text-brand-primary"> Log In</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpForm;
