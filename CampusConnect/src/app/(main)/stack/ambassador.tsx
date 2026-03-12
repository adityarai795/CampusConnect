import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Ambassador = () => {
  const navigation = useNavigation();

  const ambassadors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Developer",
      icon: "👩‍💼",
      followers: 1200,
    },
    { id: 2, name: "Mike Chen", role: "Tech Lead", icon: "👨‍💼", followers: 890 },
    {
      id: 3,
      name: "Emma Davis",
      role: "Product Manager",
      icon: "👩‍💻",
      followers: 650,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Ambassador</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <MaterialCommunityIcons name="star" size={48} color="#FFB800" />
          <Text style={styles.heading}>Join Our Ambassador Program</Text>
          <Text style={styles.description}>
            Become a CampusConnect ambassador and help others grow their coding
            skills. Get exclusive perks and recognition.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Apply Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Ambassadors</Text>
          {ambassadors.map((ambassador) => (
            <View key={ambassador.id} style={styles.ambassadorCard}>
              <Text style={styles.ambassadorIcon}>{ambassador.icon}</Text>
              <View style={styles.ambassadorInfo}>
                <Text style={styles.ambassadorName}>{ambassador.name}</Text>
                <Text style={styles.ambassadorRole}>{ambassador.role}</Text>
              </View>
              <View style={styles.followersSection}>
                <MaterialCommunityIcons
                  name="heart"
                  size={16}
                  color="#FF3B30"
                />
                <Text style={styles.followers}>{ambassador.followers}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ambassador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderColor: "#FFB800",
    borderWidth: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#FFB800",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  ambassadorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  ambassadorIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  ambassadorInfo: {
    flex: 1,
  },
  ambassadorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  ambassadorRole: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  followersSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  followers: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
});
