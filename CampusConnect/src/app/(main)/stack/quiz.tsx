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

const Quiz = () => {
  const navigation = useNavigation();

  const quizzes = [
    {
      id: 1,
      title: "JavaScript Basics",
      difficulty: "Beginner",
      questions: 10,
      icon: "🟨",
    },
    {
      id: 2,
      title: "React Fundamentals",
      difficulty: "Intermediate",
      questions: 15,
      icon: "⚛️",
    },
    {
      id: 3,
      title: "Advanced TypeScript",
      difficulty: "Advanced",
      questions: 20,
      icon: "🔷",
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
        <Text style={styles.title}>Quiz</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Quizzes Taken</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>84%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Quizzes</Text>
          {quizzes.map((quiz) => (
            <TouchableOpacity key={quiz.id} style={styles.quizCard}>
              <Text style={styles.quizIcon}>{quiz.icon}</Text>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <View style={styles.quizDetails}>
                  <Text style={styles.difficulty}>{quiz.difficulty}</Text>
                  <Text style={styles.questions}>•</Text>
                  <Text style={styles.questions}>
                    {quiz.questions} Questions
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.takeButton}>
                <Text style={styles.takeButtonText}>Take</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;

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
  statsCard: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  stat: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
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
  quizCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  quizIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  quizDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  difficulty: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  questions: {
    fontSize: 12,
    color: "#999",
    marginHorizontal: 4,
  },
  takeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  takeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
