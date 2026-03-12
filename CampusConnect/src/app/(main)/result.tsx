import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Header from "../../components/Header";

const Result = () => {
  const results = [
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      score: 85,
      maxScore: 100,
      date: "Mar 10, 2026",
      status: "Passed",
      icon: "✅",
    },
    {
      id: 2,
      title: "React Advanced Concepts",
      score: 92,
      maxScore: 100,
      date: "Mar 8, 2026",
      status: "Passed",
      icon: "✅",
    },
    {
      id: 3,
      title: "CSS Styling Challenge",
      score: 72,
      maxScore: 100,
      date: "Mar 5, 2026",
      status: "Passed",
      icon: "✅",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Test Results</Text>
          <Text style={styles.subtitle}>Track your assessment progress</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Tests Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>83%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
        </View>

        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Recent Results</Text>
          {results.map((result) => (
            <TouchableOpacity key={result.id} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.icon}>{result.icon}</Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                  <Text style={styles.resultDate}>{result.date}</Text>
                </View>
                <View style={styles.scoreSection}>
                  <Text style={styles.score}>{result.score}</Text>
                  <Text style={styles.maxScore}>/{result.maxScore}</Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(result.score / result.maxScore) * 100}%` },
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerSection: {
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
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  resultsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  resultDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  scoreSection: {
    alignItems: "flex-end",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34C759",
  },
  maxScore: {
    fontSize: 12,
    color: "#666",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E5EA",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34C759",
  },
});
