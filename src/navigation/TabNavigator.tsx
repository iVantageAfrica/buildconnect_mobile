import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/builders/home/home";
import ClientHomeScreen from "../screens/clients/home/home";
import ProjectsScreen from "../screens/builders/projects/projects";
import ClientProjectsScreen from "../screens/clients/projects/projects";
import PropertiesScreen from "../screens/builders/properties/properties";
import ClientPropertiesScreen from "../screens/clients/properties/properties";
import SettingsScreen from "../screens/builders/settings/settings";
import SupportScreen from "../screens/clients/support/support";
import { Image, View } from "react-native";
import { Home, House, Question, Vector } from "../constants/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/src/store/Authstore";

const Tab = createBottomTabNavigator();

// Reusable Tab Icon Component
const TabIcon = ({ focused, icon }: { focused: boolean; icon: any }) => (
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
  const { user } = useAuthStore();
  console.log("user role:", user?.role);
  const role = user?.role || "builder";
  const isClient = role === "client";

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
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
          component={isClient ? ClientHomeScreen : HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Home} />,
            tabBarLabel: "Home",
          }}
        />

        <Tab.Screen
          name="Projects"
          component={isClient ? ClientProjectsScreen : ProjectsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={Vector} />
            ),
            tabBarLabel: "Projects",
          }}
        />

        <Tab.Screen
          name="Properties"
          component={isClient ? ClientPropertiesScreen : PropertiesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={House} />
            ),
            tabBarLabel: "Properties",
          }}
        />

        {isClient ? (
          <Tab.Screen
            name="Support"
            component={SupportScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={Question} />
              ),
              tabBarLabel: "Support",
            }}
          />
        ) : (
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
        )}
      </Tab.Navigator>
    </SafeAreaView>
  );
}