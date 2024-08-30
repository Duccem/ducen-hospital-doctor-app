import { faChevronDown, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Pill, Stethoscope, Syringe } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
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

const icons = [
  <Pill color={'#0E0E0E'} size={20} />,
  <Stethoscope color={'#0E0E0E'} size={20} />,
  <Syringe color={'#0E0E0E'} size={20} />,
];

const chartData = [
  {
    value: 47,
    color: '#009FFF',
    gradientCenterColor: '#006DFF',
    focused: true,
  },
  { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
  { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
  { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
];

const barData = [
  {
    value: 40,
    label: 'Jan',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#0E0E0E' },
    frontColor: '#177AD5',
  },
  { value: 20, frontColor: '#8F80F3' },
  {
    value: 50,
    label: 'Feb',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#0E0E0E' },
    frontColor: '#177AD5',
  },
  { value: 40, frontColor: '#8F80F3' },
  {
    value: 75,
    label: 'Mar',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#0E0E0E' },
    frontColor: '#177AD5',
  },
  { value: 25, frontColor: '#8F80F3' },
  {
    value: 30,
    label: 'Apr',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#0E0E0E' },
    frontColor: '#177AD5',
  },
  { value: 20, frontColor: '#8F80F3' },
  {
    value: 60,
    label: 'May',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#0E0E0E' },
    frontColor: '#177AD5',
  },
  { value: 40, frontColor: '#8F80F3' },
  {
    value: 65,
    label: 'Jun',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: '#0E0E0E' },
    frontColor: '#177AD5',
  },
  { value: 30, frontColor: '#8F80F3' },
];

const AppointmentCard = ({ item }: any) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  return (
    <View
      key={item.id}
      className={`flex flex-row p-3 bg-gray-100  my-1 rounded-2xl items-center justify-between ${
        item.id === 1 ? 'bg-violet-200' : ''
      }`}
    >
      <View className="flex flex-row justify-start items-center">
        <View
          className={`flex justify-center items-center p-3 rounded-full mr-2 ${randomColor}`}
        >
          {randomIcon}
        </View>
        <View>
          <Text className="text-lg font-NunitoBold">{item.patientName}</Text>
          <Text className="text-md font-NunitoSemiBold text-foreground-secondary">
            {item.type}
          </Text>
        </View>
      </View>
      <View
        className={`py-1 px-2 items-center justify-center ${randomColor} rounded-full`}
      >
        <Text>{item.time}</Text>
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
    <View className="flex flex-col justify-start items-center p-3 rounded-3xl  bg-violet-200">
      <Text className="text-xl font-NunitoBold">Appointment types</Text>
      <View className="w-full flex flex-row justify-between items-center mt-3">
        <PieChart
          data={chartData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#ddd6fe'}
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
            {renderDot('#006DFF')}
            <Text>Routine: 47%</Text>
          </View>
          <View className="flex flex-row items-center w-32">
            {renderDot('#3BE9DE')}
            <Text>Emergency: 40%</Text>
          </View>
          <View className="flex flex-row items-center w-32">
            {renderDot('#8F80F3')}
            <Text>First meet: 16%</Text>
          </View>
          <View className="flex flex-row items-center w-32">
            {renderDot('#FF7F97')}
            <Text>Revision: 3%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SecondChart = () => {
  return (
    <View className="flex flex-col justify-start items-center p-3 rounded-3xl  bg-cyan-200 mt-10">
      <Text className="text-xl font-NunitoBold">Appointment Volume</Text>
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
          yAxisTextStyle={{ color: 'gray' }}
          noOfSections={3}
          maxValue={75}
        />
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
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
        <Text className="text-2xl text-foreground-primary font-NunitoExtraBold">
          Good Morning, Dr Jose.
        </Text>
        <View className="py-4 px-5 bg-gray-100 rounded-xl mt-3 flex flex-row">
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
          <FirstChart />
          <SecondChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
