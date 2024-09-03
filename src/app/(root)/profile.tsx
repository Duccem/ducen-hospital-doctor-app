import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { ArrowLeft, Settings } from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { user } = useUser();
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
      }}
      style={{ height: Dimensions.get('screen').height }}
    >
      <SafeAreaView
        className="bg-brand-primary relative h-screen"
        style={{ height: Dimensions.get('screen').height }}
      >
        <View className="px-5 pt-5 absolute top-7">
          <TouchableWithoutFeedback onPress={() => router.back()}>
            <ArrowLeft className="text-white" size={30} />
          </TouchableWithoutFeedback>
        </View>
        <View className="h-full w-full relative bg-background-third rounded-t-[40px] mt-[90px]">
          <View className="w-[80px] h-[80px] top-[-20px] left-10 z-50 rounded-2xl absolute  bg-background-third shadow-lg shadow-gray-400 flex justify-center items-center">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-[80px] h-[80px] rounded-2xl"
              resizeMode="contain"
            />
          </View>
          <View className="w-full min-h-[100px] mt-16 mb-4 py-5 px-10 ">
            <View className="my-2 flex flex-row justify-between ">
              <View className="w-2/3">
                <Text className=" text-2xl font-NunitoBold">
                  Dr. {user?.fullName}
                </Text>
                <Text className="text-brand-primary text-lg font-NunitoSemiBold">
                  Cardiologist
                </Text>
              </View>
              <View className="flex flex-row justify-end">
                <View className="px-5 flex justify-center items-center bg-violet-200 rounded-xl h-[30px]">
                  <Text className="text-md font-NunitoBold text-brand-primary">
                    Edit
                  </Text>
                </View>
                <View className="px-5 py-2 bg-violet-200 rounded-xl  flex justify-center items-center h-[30px] w-[40px] ml-2">
                  <Settings className="text-brand-primary" size={20} />
                </View>
              </View>
            </View>
            <View className="my-2">
              <Text className="text-gray-500 mr-10 text-md font-NunitoSemiBold">
                I am a highly skilled cardiologist with years of experience in
                diagnosing and treating cardiovascular diseases.
              </Text>
            </View>
            <Text className="text-xl font-NunitoSemiBold my-2">
              General info
            </Text>
            <View className="flex flex-col">
              <View className="flex flex-row justify-center items-center gap-[8px] my-2">
                <View className="bg-gray-200 rounded-xl p-3 w-1/2">
                  <Text className="text-sm font-NunitoExtraBold text-gray-500">
                    License
                  </Text>
                  <Text className="text-foreground-secondary font-NunitoBold">
                    ABC123456
                  </Text>
                </View>
                <View className="bg-gray-200 rounded-xl p-3 w-1/2">
                  <Text className="text-sm font-NunitoExtraBold text-gray-500">
                    Specialty
                  </Text>
                  <Text className="text-foreground-secondary font-NunitoBold">
                    Cardiology
                  </Text>
                </View>
              </View>
              <View className="flex flex-row justify-center items-center gap-[8px] my-2">
                <View className="bg-gray-200 rounded-xl p-3 w-1/2">
                  <Text className="text-sm font-NunitoExtraBold text-gray-500">
                    Location
                  </Text>
                  <ScrollView horizontal className="h-5">
                    <Text className="text-foreground-secondary font-NunitoBold overflow-scroll">
                      Porlamar, Nueva Esparta
                    </Text>
                  </ScrollView>
                </View>
                <View className="bg-gray-200 rounded-xl p-3 w-1/2">
                  <Text className="text-sm font-NunitoExtraBold text-gray-500">
                    Experience
                  </Text>
                  <Text className="text-foreground-secondary font-NunitoBold">
                    5 years
                  </Text>
                </View>
              </View>
            </View>
            <Text className="text-xl font-NunitoSemiBold mt-2">Contacts</Text>
            <View className="flex flex-col">
              <View className="flex flex-row justify-center items-center gap-[8px] my-2">
                <View className="bg-gray-200 rounded-xl p-3 w-1/2">
                  <Text className="text-sm font-NunitoExtraBold text-gray-500">
                    Email
                  </Text>
                  <Text className="text-foreground-secondary font-NunitoBold">
                    {user?.emailAddresses[0].emailAddress}
                  </Text>
                </View>
                <View className="bg-gray-200 rounded-xl p-3 w-1/2">
                  <Text className="text-sm font-NunitoExtraBold text-gray-500">
                    Phone
                  </Text>
                  <Text className="text-foreground-secondary font-NunitoBold">
                    {user?.phoneNumbers[0]?.phoneNumber || '+58 412 000 0000'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;
