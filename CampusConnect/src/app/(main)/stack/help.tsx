import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Help = () => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="help-circle"
            size={48}
            color="#007AFF"
          />
          <Text style={styles.heading}>We&apos;re Here to Help</Text>
          <Text style={styles.description}>
            Get answers to your questions and connect with our support team
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Options</Text>
          <TouchableOpacity style={styles.supportOption}>
            <MaterialCommunityIcons name="email" size={24} color="#007AFF" />
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Email Support</Text>
              <Text style={styles.optionDesc}>support@campusconnect.com</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportOption}>
            <MaterialCommunityIcons name="chat" size={24} color="#34C759" />
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Live Chat</Text>
              <Text style={styles.optionDesc}>Chat with us now</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportOption}>
            <MaterialCommunityIcons name="phone" size={24} color="#FF9500" />
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Phone Support</Text>
              <Text style={styles.optionDesc}>+1 (555) 123-4567</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Issues</Text>
          <TouchableOpacity style={styles.issueCard}>
            <Text style={styles.issueTitle}>How do I reset my password?</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.issueCard}>
            <Text style={styles.issueTitle}>How do I update my profile?</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Help;

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
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
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
  supportOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  optionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  optionDesc: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  issueCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  issueTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    flex: 1,
  },
});
