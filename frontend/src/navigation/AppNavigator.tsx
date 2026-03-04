import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutStack from './WorkoutStack';
import ProfileStack from './ProfileStack';
import { User, Home} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown            : false,
        tabBarActiveTintColor  : '#F97316',
        tabBarLabelStyle       : {
          fontSize: 15,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Workouts"
        component={WorkoutStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
