import { useUser } from '@clerk/clerk-expo';
import { faChevronDown, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';
import { Activity } from 'lucide-react-native';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { SafeAreaView } from 'react-native-safe-area-context';
const appointments = [
  { id: 1, patientName: 'John Doe', time: '10:00 AM', type: 'Emergency' },
  {
    id: 2,
    patientName: 'Jane Smith',
    time: '11:30 AM',
    type: 'Routine Check up',
  },
  {
    id: 3,
    patientName: 'Mike Johnson',
    time: '2:00 PM',
    type: 'Consultation',
  },
];
const colors = [
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-red-200',
  'bg-background-primary',
];

const chartData = [
  {
    value: 47,
    color: '#8167EC',
    gradientCenterColor: '#006DFF',
  },
  { value: 40, color: '#ab9afc', gradientCenterColor: '#3BE9DE' },
  { value: 16, color: '#ddd6fe', gradientCenterColor: '#8F80F3' },
];

const barData = [
  {
    value: 40,
    label: 'Jan',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#FFFFFF' },
    frontColor: '#0E0E0E',
  },
  { value: 20, frontColor: '#FFFFFF' },
  {
    value: 50,
    label: 'Feb',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#FFFFFF' },
    frontColor: '#0E0E0E',
  },
  { value: 40, frontColor: '#FFFFFF' },
  {
    value: 75,
    label: 'Mar',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#FFFFFF' },
    frontColor: '#0E0E0E',
  },
  { value: 25, frontColor: '#FFFFFF' },
  {
    value: 30,
    label: 'Apr',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#FFFFFF' },
    frontColor: '#0E0E0E',
  },
  { value: 20, frontColor: '#FFFFFF' },
  {
    value: 60,
    label: 'May',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#FFFFFF' },
    frontColor: '#0E0E0E',
  },
  { value: 40, frontColor: '#FFFFFF' },
  {
    value: 65,
    label: 'Jun',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#FFFFFF' },
    frontColor: '#0E0E0E',
  },
  { value: 30, frontColor: '#FFFFFF' },
];

const lineChart = [
  { value: 10, label: '10:30' },
  { value: 27, label: '11:30' },
  { value: 33, label: '12:30' },
  { value: 42, label: '1:30' },
  { value: 50, label: '2:30' },
  { value: 35, label: '3:30' },
  { value: 45, label: '4:30' },
  { value: 17, label: '5:30' },
];

const AppointmentCard = ({ item }: any) => {
  return (
    <View
      key={item.id}
      className={`flex flex-row p-3 bg-background-primary  my-1 rounded-2xl  items-center justify-between shadow-lg shadow-slate-400 ${
        item.id === 1 ? 'bg-brand-primary' : ''
      }`}
    >
      <View className="flex flex-row justify-start items-center">
        <View
          className={`flex justify-center items-center p-3 rounded-full mr-2 ${
            item.id === 1 ? 'bg-white' : 'bg-brand-primary'
          }`}
        >
          <Activity color={item.id === 1 ? '#0E0E0E' : '#ffffff'} />
        </View>
        <View>
          <Text
            className={`text-lg font-NunitoBold ${
              item.id === 1 ? 'text-white' : ''
            }`}
          >
            {item.patientName}
          </Text>
          <Text
            className={`text-md font-NunitoSemiBold ${
              item.id === 1 ? 'text-white' : ''
            }`}
          >
            {item.type}
          </Text>
        </View>
      </View>
      <View
        className={`py-1 px-2 items-center justify-center ${
          item.id === 1 ? 'bg-white' : 'bg-brand-primary'
        } rounded-full`}
      >
        <Text className={item.id === 1 ? 'text-black' : 'text-white'}>
          {item.time}
        </Text>
      </View>
    </View>
  );
};
const renderDot = (color: string) => {
  return (
    <View
      className={`rounded-md w-3 h-3  mr-2`}
      style={{ backgroundColor: color }}
    />
  );
};

const FirstChart = () => {
  return (
    <View className="flex flex-col relative justify-start items-center p-3 rounded-3xl mt-10  bg-background-primary overflow-hidden shadow-lg  shadow-slate-400">
      <Text className="text-xl w-full font-NunitoBold">Appointment types:</Text>
      <View className="w-full flex flex-row justify-between items-center mt-3">
        <PieChart
          data={chartData}
          donut
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'white'}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text className="text-2xl font-NunitoBold">47%</Text>
                <Text className="text-xl font-NunitoSemiBold">Routine</Text>
              </View>
            );
          }}
        />
        <View>
          <View className="flex flex-row items-center w-32">
            {renderDot('#8167EC')}
            <Text className="font-NunitoBold">Routine: 47%</Text>
          </View>
          <View className="flex flex-row items-center w-32">
            {renderDot('#ab9afc')}
            <Text className="font-NunitoBold">Emergency: 40%</Text>
          </View>
          <View className="flex flex-row items-center w-32">
            {renderDot('#ddd6fe')}
            <Text className="font-NunitoBold">First meet: 16%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SecondChart = () => {
  return (
    <View className="flex flex-col relative justify-start items-center p-3 rounded-3xl  bg-brand-primary mt-10 overflow-hidden shadow-lg shadow-slate-400">
      <Text className="text-xl w-full font-NunitoBold text-white">
        Appointment Volume:
      </Text>
      <View className="flex flex-row w-full mt-4 mb-2">
        <View className="flex flex-col">
          <Text className="text-md font-NunitoExtraBold text-white">
            14 pers
          </Text>
          <Text className="text-md font-NunitoMedium text-white">
            20-25 Y.0
          </Text>
        </View>
        <View className="flex flex-col ml-4">
          <Text className="text-md font-NunitoExtraBold text-white">
            7 pers
          </Text>
          <Text className="text-md font-NunitoMedium text-white">
            25-40 Y.0
          </Text>
        </View>
        <View className="flex flex-col ml-4">
          <Text className="text-md font-NunitoExtraBold text-white">
            2 pers
          </Text>
          <Text className="text-md font-NunitoMedium text-white">45+ Y.0</Text>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between items-center mt-3">
        <BarChart
          data={barData}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: '#FFFF' }}
          noOfSections={3}
          maxValue={75}
        />
      </View>
    </View>
  );
};

const ThirdChart = () => {
  return (
    <View className="flex flex-col relative justify-start items-center p-3 rounded-3xl mt-10  bg-background-primary overflow-hidden shadow-lg shadow-slate-400">
      <Text className="text-xl w-full font-NunitoBold">Visits summary:</Text>
      <View className="flex flex-row w-full mt-4 mb-2">
        <View className="flex flex-col">
          <Text className="text-md font-NunitoExtraBold">24 min</Text>
          <Text className="text-md uppercase font-NunitoMedium text-foreground-secondary">
            Average
          </Text>
        </View>
        <View className="flex flex-col ml-4">
          <Text className="text-md font-NunitoExtraBold">15 min</Text>
          <Text className="text-md font-NunitoMedium text-foreground-secondary">
            MINIMUM
          </Text>
        </View>
        <View className="flex flex-col ml-4">
          <Text className="text-md font-NunitoExtraBold">01:30 h</Text>
          <Text className="text-md uppercase font-NunitoMedium text-foreground-secondary">
            maximum
          </Text>
        </View>
      </View>
      <View className="w-full px-3 flex flex-row justify-center items-center mt-3">
        <LineChart
          xAxisLabelTextStyle={{
            color: '#0E0E0E',
            fontFamily: 'NunitoExtraBold',
          }}
          yAxisColor={'transparent'}
          thickness={3}
          dataPointsRadius={5}
          hideRules
          width={Dimensions.get('window').width - 120}
          curved
          curvature={0.25}
          data={lineChart}
          hideYAxisText={true}
          showXAxisIndices
          color={'#8167EC'}
          dataPointsColor="#8167EC"
        />
      </View>
      <View></View>
    </View>
  );
};

const FourChart = () => {
  return (
    <View className="flex flex-col relative justify-start items-center p-3 rounded-3xl  bg-brand-primary  overflow-hidden shadow-lg shadow-slate-400">
      <Text className="text-xl w-full font-NunitoBold text-white">
        By condition:
      </Text>
      <View className="flex flex-row w-full mt-4 mb-2">
        <View className="flex flex-col">
          <Text className="text-md font-NunitoExtraBold text-white">
            14 pers
          </Text>
          <Text className="text-md uppercase font-NunitoMedium text-white">
            estable
          </Text>
        </View>
        <View className="flex flex-col ml-4">
          <Text className="text-md font-NunitoExtraBold text-white">
            7 pers
          </Text>
          <Text className="text-md uppercase font-NunitoMedium text-white">
            fair
          </Text>
        </View>
        <View className="flex flex-col ml-4">
          <Text className="text-md font-NunitoExtraBold text-white">
            2 pers
          </Text>
          <Text className="text-md uppercase font-NunitoMedium text-white">
            critical
          </Text>
        </View>
      </View>
    </View>
  );
};

const Home = () => {
  const { user } = useUser();
  return (
    <SafeAreaView className="flex-1 bg-background-third">
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          padding: 20,
          paddingBottom: 110,
        }}
      >
        <View className="flex flex-row justify-start items-center gap-2">
          <FontAwesomeIcon color="#8167EC" icon={faSun} />
          <Text className="text-brand-primary font-NunitoBold">
            Thur 29 Agu
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-2xl text-foreground-primary font-NunitoExtraBold">
            Good Morning, Dr Jose.
          </Text>
          <TouchableOpacity
            className="bg-brand-primary rounded-xl"
            onPress={() => {
              router.push('/(root)/profile');
            }}
          >
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-10 h-10 rounded-xl"
            />
          </TouchableOpacity>
        </View>
        <View className="py-4 px-5 bg-white rounded-xl mt-3 flex flex-row shadow-lg shadow-slate-400">
          <View className="w-1/4 mr-2 flex justify-center items-center">
            <View className="bg-brand-primary rounded-lg w-[70px] h-[70px] flex justify-center items-center">
              <Text className="font-NunitoBold text-2xl text-background-primary">
                8.5
              </Text>
            </View>
          </View>
          <View className="w-3/4">
            <Text className="text-lg font-NunitoBold">Medical Score</Text>
            <Text className="text-sm text-foreground-secondary font-NunitoMedium">
              Based on your overall performance and patient satisfaction rating,
              your medical score is 8.5
            </Text>
            <Text className="font-NunitoBold text-sm text-brand-primary">
              Read more
            </Text>
          </View>
        </View>

        <View className="mt-10">
          <View className="flex flex-row justify-between">
            <Text className="text-xl font-NunitoBold">Patient`s list:</Text>
            <View className="px-3 py-1 items-center justify-center flex flex-row bg-foreground-primary rounded-full">
              <Text className="text-background-primary mr-2">Today</Text>
              <FontAwesomeIcon color="white" icon={faChevronDown} />
            </View>
          </View>
          <View className="mt-3">
            {appointments.map((appointment) => (
              <AppointmentCard item={appointment} key={appointment.id} />
            ))}
          </View>
        </View>
        <View className="mt-10">
          <Text className="text-xl font-NunitoBold mb-3">Reports:</Text>
          <FourChart />
          <FirstChart />
          <SecondChart />
          <ThirdChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
