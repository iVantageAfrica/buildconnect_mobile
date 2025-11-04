import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/builders/home/home";
import ProjectsScreen from "../screens/builders/projects/projects";
import PropertiesScreen from "../screens/builders/properties/properties";
import SettingsScreen from "../screens/builders/settings/settings";
import { Image, View } from "react-native";
import { Home, House, Question, Vector } from "../constants/icon";

const Tab = createBottomTabNavigator();

// Reusable Tab Icon Component
const TabIcon = ({ focused, icon }) => (
  <View style={{ alignItems: "center", justifyContent: "center", height: 32 }}>
    {focused && (
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#007bff",
          marginBottom: 4,
        }}
      />
    )}
    <Image
      source={icon}
      style={{
        width: 20,
        height: 20,
        tintColor: focused ? "#007bff" : "#888",
      }}
      resizeMode="contain"
    />
  </View>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Inter_400Regular',
          marginTop: 4,  
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          paddingBottom: 5,
          paddingTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Home} />,
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Vector} />
          ),
          tabBarLabel: "Projects",
        }}
      />

      <Tab.Screen
        name="Properties"
        component={PropertiesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={House} />
          ),
          tabBarLabel: "Properties",
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Question} />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}