import React, { useCallback, useEffect, useState } from "react";
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
import api from "@/src/services/api";
import { useRouter } from "expo-router";
const INITIAL_STAGES = [
  {
    id: 1,
    stage: "Fundamentals",
    topics: "HTML, CSS, JavaScript",
    completed: true,
    icon: "📚",
  },
  {
    id: 2,
    stage: "Frontend Basics",
    topics: "React, Responsive Design",
    completed: true,
    icon: "🎨",
  },
  {
    id: 3,
    stage: "Backend",
    topics: "Node.js, Databases",
    completed: false,
    icon: "⚙️",
  },
  {
    id: 4,
    stage: "Full Stack",
    topics: "Full App Development",
    completed: false,
    icon: "🏗️",
  },
];

const Roadmap = () => {
  const navigation = useNavigation<any>();
const router = useRouter();

  // ===== STATE =====
  const [roadmapStages, setRoadmapStages] = useState<any[]>([]);

  // ===== HANDLERS =====
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const fetchRoadmap = async () => {
    try {
      const response = await api.get("/roadmap/getAll");
      const data = Array.isArray(response?.data)
        ? response.data
        : [];
      setRoadmapStages(data);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  }
  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleStagePress = useCallback(
    (id: number, stageName: string) => {
      const stage = roadmapStages.find((s) => s.id === id);
      if (stage?.completed) {
        Alert.alert("Stage Completed", `You have completed "${stageName}"!`);
      } else {
        Alert.alert("Start Learning", `Begin learning "${stageName}"?`, [
          { text: "Cancel", style: "cancel" },
          {
            text: "Start",
            onPress: () => {
              console.log("Starting stage:", stageName);
            },
          },
        ]);
      }
    },
    [roadmapStages],
  );

  // ===== CALCULATIONS =====
  const completedCount = roadmapStages.filter((s) => s.completed).length;
  const totalCount = roadmapStages.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Roadmap</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Your Progress</Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {completedCount} of {totalCount} stages completed
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Path</Text>
          {roadmapStages.map((stage, index) => (
            <TouchableOpacity
              key={stage.id}
              // onPress={() => handleStagePress(stage.id, stage.title)}
              onPress={() => {
navigation.navigate("openRoadmap", { id: stage._id });              }}
            >
              <View style={styles.stageCard}>
                <View
                  style={[
                    styles.stageNumber,
                    stage.completed && styles.stageNumberCompleted,
                  ]}
                >
                  <Text style={styles.stageNumberText}>
                    {stage.completed ? "✓" : index + 1}
                  </Text>
                </View>
                <View style={styles.stageInfo}>
                  <Text style={styles.stageName}>{stage.title}</Text>
                  <Text style={styles.stageTopics}>{stage.category}</Text>
                </View>
                <Text style={styles.stageIcon}>{stage.icon}</Text>
              </View>
              {index < roadmapStages.length - 1 && (
                <View style={styles.stageConnector} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Roadmap;

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
  progressCard: {
    backgroundColor: "#E8F5FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#D0E8FF",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
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
  stageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  stageNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E5EA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stageNumberCompleted: {
    backgroundColor: "#34C759",
  },
  stageNumberText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  stageInfo: {
    flex: 1,
  },
  stageName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  stageTopics: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  stageIcon: {
    fontSize: 24,
    marginLeft: 8,
  },
  stageConnector: {
    width: 2,
    height: 16,
    backgroundColor: "#E5E5EA",
    marginLeft: 17,
    marginBottom: -8,
  },
});
