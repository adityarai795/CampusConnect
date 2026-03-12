import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DrawerContent from "../../components/DrawerContent";

// Import tab screens
import Home from "./index";
import Community from "./community";
import Job from "./job";
import Result from "./result";

// Import stack screens
import Resume from "./stack/resume";
import MarketPlace from "./stack/marketplace";
import Quiz from "./stack/quiz";
import Ambassador from "./stack/ambassador";
import Roadmap from "./stack/roadmap";
import Resources from "./stack/resources";
import Help from "./stack/help";
import Contact from "./stack/contact";
import About from "./stack/about";
import FAQ from "./stack/faq";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#E5E5EA",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={Community}
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="JobTab"
        component={Job}
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ResultTab"
        component={Result}
        options={{
          title: "Results",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="check-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainLayout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props:any) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="tabsGroup"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Stack navigation screens */}
      <Drawer.Screen name="resume" component={Resume} />
      <Drawer.Screen name="marketplace" component={MarketPlace} />
      <Drawer.Screen name="quiz" component={Quiz} />
      <Drawer.Screen name="ambassador" component={Ambassador} />
      <Drawer.Screen name="roadmap" component={Roadmap} />
      <Drawer.Screen name="resources" component={Resources} />
      <Drawer.Screen name="help" component={Help} />
      <Drawer.Screen name="contact" component={Contact} />
      <Drawer.Screen name="about" component={About} />
      <Drawer.Screen name="faq" component={FAQ} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
