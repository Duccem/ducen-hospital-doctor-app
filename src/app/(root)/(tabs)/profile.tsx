import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const Profile = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={() => {
          signOut();
          router.push('/(auth)/sign-in');
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
