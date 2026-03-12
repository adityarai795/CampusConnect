import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SidebarProps {
  onNavigate: (route: string) => void;
}

const { width } = Dimensions.get("window");

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
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
    { icon: "phone", label: "Contact", route: "contact" },
    { icon: "information", label: "About", route: "about" },
    { icon: "frequently-asked-questions", label: "FAQ", route: "faq" },
  ];

  return (
    <View style={styles.sidebar}>
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
              onPress={() => onNavigate(feature.route)}
            >
              <MaterialCommunityIcons
                name={feature.icon as any}
                size={20}
                color="#007AFF"
              />
              <Text style={styles.menuLabel}>{feature.label}</Text>
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
              onPress={() => onNavigate(feature.route)}
            >
              <MaterialCommunityIcons
                name={feature.icon as any}
                size={20}
                color="#FF9500"
              />
              <Text style={styles.menuLabel}>{feature.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sidebar: {
    width: width * 0.3,
    backgroundColor: "#F9F9F9",
    borderRightColor: "#E5E5EA",
    borderRightWidth: 1,
    paddingTop: 16,
    height: "100%",
  },
  scrollView: {
    flex: 1,
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
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginHorizontal: 8,
    marginBottom: 16,
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
    paddingTop: 16,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF3B30",
    marginLeft: 8,
  },
});
