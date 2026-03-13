import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const Home = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Welcome to CampusConnect</Text>
          <Text style={styles.subtitle}>
            Your learning hub for coding and career growth
          </Text>
        </View>

        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.grid}>
            {[
              { icon: "file-document", label: "Resume", route: "resume" },
              {
                icon: "shopping",
                label: "Market Place",
                route: "marketplace",
              },
              { icon: "brain", label: "Quiz", route: "quiz" },
              { icon: "star", label: "Ambassador", route: "ambassador" },
            ].map((item) => (
              <TouchableOpacity
                key={item.route}
                style={styles.card}
                onPress={() => navigation.navigate(item.route)}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={32}
                  color="#007AFF"
                />
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Featured Content</Text>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="road" size={24} color="#007AFF" />
            <Text style={styles.featureTitle}>Roadmap</Text>
            <Text style={styles.featureDesc}>Follow our learning roadmap</Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="book" size={24} color="#34C759" />
            <Text style={styles.featureTitle}>Resources</Text>
            <Text style={styles.featureDesc}>Access learning materials</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: "#F2F2F7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  quickAccessSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featureCard: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 8,
  },
  featureDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
