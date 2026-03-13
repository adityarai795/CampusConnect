import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DrawerContentProps {
  navigation: DrawerNavigationProp<any>;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ navigation }) => {
  const mainFeatures = [
    { icon: "file-document", label: "Resume", route: "resume" },
    { icon: "shopping", label: "Market Place", route: "marketplace" },
    { icon: "brain", label: "Quiz", route: "quiz" },
    { icon: "star", label: "Ambassador", route: "ambassador" },
    { icon: "road", label: "Roadmap", route: "roadmap" },
    { icon: "book", label: "Resources", route: "resources" },
  ];

  const supportFeatures = [
    { icon: "help-circle", label: "Help & Support", route: "help" },
    { icon: "information", label: "About", route: "about" },
    { icon: "frequently-asked-questions", label: "FAQ", route: "faq" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons
            name="account-circle"
            size={48}
            color="#007AFF"
          />
        </View>
        <View style={styles.userInfo}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("profile");
            }}
          >
            <Text style={styles.name}>Aditya Rai</Text>
            <Text style={styles.email}>adityarai@123.com</Text>
          </TouchableOpacity> 
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {mainFeatures.map((feature) => (
            <TouchableOpacity
              key={feature.route}
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate(feature.route);
              }}
            >
              <MaterialCommunityIcons
                name={feature.icon as any}
                size={20}
                color="#007AFF"
              />
              <Text style={styles.menuLabel}>{feature.label}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={18}
                color="#999"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Section */}
        <View style={[styles.section, styles.supportSection]}>
          <Text style={styles.sectionTitle}>Support</Text>
          {supportFeatures.map((feature) => (
            <TouchableOpacity
              key={feature.route}
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate(feature.route);
              }}
            >
              <MaterialCommunityIcons
                name={feature.icon as any}
                size={20}
                color="#FF9500"
              />
              <Text style={styles.menuLabel}>{feature.label}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={18}
                color="#999"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View style={styles.footerSection}>
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  email: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  supportSection: {
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    textTransform: "uppercase",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginLeft: 12,
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
  footerSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderTopColor: "#E5E5EA",
  },
  logoutText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF3B30",
    marginLeft: 8,
  },
});
