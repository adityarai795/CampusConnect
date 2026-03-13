import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const INITIAL_RESUMES = [
  {
    id: 1,
    name: "Software Engineer Resume",
    updatedAt: "2 days ago",
  },
];

const Resume = () => {
  const navigation = useNavigation();

  // ===== STATE =====
  const [resumes, setResumes] = useState(INITIAL_RESUMES);

  // ===== HANDLERS =====
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreateResume = useCallback(() => {
    Alert.alert("Create Resume", "Start building your professional resume", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Create",
        onPress: () => console.log("Creating new resume"),
      },
    ]);
  }, []);

  const handleViewTemplates = useCallback(() => {
    console.log("Viewing resume templates");
  }, []);

  const handleResumePress = useCallback((id: number, name: string) => {
    console.log("Opening resume:", name);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Resume</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="file-document"
            size={48}
            color="#007AFF"
          />
          <Text style={styles.heading}>Build & Manage Your Resume</Text>
          <Text style={styles.description}>
            Create a professional resume that showcases your skills and
            experience to potential employers.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleCreateResume}>
            <Text style={styles.buttonText}>Create New Resume</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={handleViewTemplates}
          >
            <Text style={styles.buttonOutlineText}>View Templates</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Resumes</Text>
          {resumes.map((resume) => (
            <TouchableOpacity
              key={resume.id}
              style={styles.resumeItem}
              onPress={() => handleResumePress(resume.id, resume.name)}
            >
              <MaterialCommunityIcons
                name="file-document"
                size={28}
                color="#007AFF"
              />
              <View style={styles.resumeInfo}>
                <Text style={styles.resumeName}>{resume.name}</Text>
                <Text style={styles.resumeDate}>
                  Updated {resume.updatedAt}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Resume;

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
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#007AFF",
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
  resumeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
  },
  resumeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resumeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  resumeDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});
