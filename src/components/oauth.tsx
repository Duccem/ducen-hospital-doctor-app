import google from '@/assets/icons/google.png';
import { useCreateUserMutation } from '@/src/modules/auth/infrastructure/apollo/createUser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { Alert, Image } from 'react-native';
import uuid from 'react-native-uuid';
import Button from '../lib/ui/components/button';

interface OauthProps {
  title: string;
}

export const Oauth = ({ title }: OauthProps) => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { createUser } = useCreateUserMutation();
  const onOauthPress = async () => {
    try {
      const { createdSessionId, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(root)/(tabs)/home', {
          scheme: 'exp://127.0.0.1:8081',
        }),
      });
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        if (signUp?.createdUserId) {
          await createUser({
            variables: {
              user: {
                id: uuid.v4(),
                email: signUp.emailAddress,
                externalId: signUp.createdUserId,
                role: 'DOCTOR',
              },
            },
          });
        }
        router.replace('/(root)/(tabs)/home');
      }
    } catch (error: any) {
      if (error.code === 'session_exists') {
        router.replace('/(root)/(tabs)/home');
        return;
      }
      Alert.alert(
        'Error',
        'An error occurred while trying to sign in with Google',
      );
    }
  };
  return (
    <Button
      title={title}
      variant={'secondary'}
      onPress={onOauthPress}
      className=""
      titleStyle="text-black text-lg"
      size={'lg'}
      Left={() => (
        <Image source={google} className="w-5 h-5 mx-6" resizeMode="contain" />
      )}
    />
  );
};
