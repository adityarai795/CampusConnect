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
import Resume from "./stack/resume/resume";
import MarketPlace from "./stack/marketplace/marketplace";
import ProductDetails from "./stack/marketplace/productDetails";
import MarketplaceUploadProduct from "./stack/marketplace/marketplaceUploadProduct";
import ViewTopics from "./stack/Quize/ViewTopics";
import Ambassador from "./stack/ambassador/ambassador";
import Roadmap from "./stack/roadmap/roadmap";
import Resources from "./stack/placementkit/resources";
import Help from "./stack/supports/help";
import About from "./stack/supports/about";
import FAQ from "./stack/supports/faq";
import Profile from "./stack/profile/profile";
import CommunityPostDetails from "./community/communityPostDetails";
import CommunityMyPosts from "./community/communityMyPosts";
import CommunityCreatePost from "./community/communityCreatePost";
import myJobs from "./stack/profile/myJobs";
import applyAmbassador from "./stack/ambassador/applyAmbassador";
import openRoadmap from "./stack/roadmap/openRoadmap";
import OpenQuize from "./stack/Quize/OpenQuize";
import CreateResume from "./stack/resume/createResume";
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
          height: 70,
          paddingBottom: 10,
        },
        tabBarHideOnKeyboard: true,
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
      drawerContent={(props: any) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="tabsGroup"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Stack navigation screens */}
      <Drawer.Screen name="resume" component={Resume} />

      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="marketplace" component={MarketPlace} />
      <Drawer.Screen name="productDetails" component={ProductDetails} />
      <Drawer.Screen
        name="marketplaceUploadProduct"
        component={MarketplaceUploadProduct}
      />
      <Drawer.Screen name="myJobs" component={myJobs} />
      <Drawer.Screen name="viewTopics" component={ViewTopics} />
      <Drawer.Screen name="openquize" component={OpenQuize} />
      <Drawer.Screen name="createResume" component={CreateResume} />
      <Drawer.Screen name="ambassador" component={Ambassador} />
      <Drawer.Screen name="applyAmbassdor" component={applyAmbassador}/>
      <Drawer.Screen name="roadmap" component={Roadmap} />
      <Drawer.Screen name="openRoadmap" component={openRoadmap} />
      <Drawer.Screen name="resources" component={Resources} />
      <Drawer.Screen
        name="communityPostDetails"
        component={CommunityPostDetails}
      />
      <Drawer.Screen name="communityMyPosts" component={CommunityMyPosts} />
      <Drawer.Screen
        name="communityCreatePost"
        component={CommunityCreatePost}
      />
      <Drawer.Screen name="help" component={Help} />
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
