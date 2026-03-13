import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Result = () => {
  const [results, setResults] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      score: 85,
      maxScore: 100,
      date: "Mar 10, 2026",
      status: "Passed",
      icon: "✅",
      category: "Quiz",
      duration: "45 mins",
    },
    {
      id: 2,
      title: "React Advanced Concepts",
      score: 92,
      maxScore: 100,
      date: "Mar 8, 2026",
      status: "Passed",
      icon: "✅",
      category: "Quiz",
      duration: "60 mins",
    },
    {
      id: 3,
      title: "CSS Styling Challenge",
      score: 72,
      maxScore: 100,
      date: "Mar 5, 2026",
      status: "Passed",
      icon: "✅",
      category: "Challenge",
      duration: "30 mins",
    },
    {
      id: 4,
      title: "Node.js Project",
      score: 88,
      maxScore: 100,
      date: "Mar 1, 2026",
      status: "Passed",
      icon: "✅",
      category: "Project",
      duration: "120 mins",
    },
  ]);

  const [expandedResult, setExpandedResult] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResults = useMemo(() => {
    if (selectedCategory === "All") return results;
    return results.filter((result) => result.category === selectedCategory);
  }, [results, selectedCategory]);

  const stats = useMemo(() => {
    const completed = results.length;
    const avgScore = Math.round(
      results.reduce((sum, r) => sum + r.score, 0) / results.length,
    );
    const perfectScores = results.filter((r) => r.score === 100).length;
    const passedCount = results.filter((r) => r.status === "Passed").length;

    return { completed, avgScore, perfectScores, passedCount };
  }, [results]);

  const handleRetakeQuiz = (resultId: number) => {
    Alert.alert("Retake Quiz", "Are you sure you want to retake this quiz?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Retake",
        onPress: () => {
          Alert.alert("Success", "Quiz started! Good luck!");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Test Results</Text>
          <Text style={styles.subtitle}>Track your assessment progress</Text>
        </View>

        {/* Enhanced Stats Section */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: "#EBF5FF" }]}>
            <MaterialCommunityIcons
              name="clipboard-check"
              size={24}
              color="#007AFF"
            />
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#F0FEF3" }]}>
            <MaterialCommunityIcons name="trophy" size={24} color="#34C759" />
            <Text style={styles.statValue}>{stats.avgScore}%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#FFF5E5" }]}>
            <MaterialCommunityIcons name="star" size={24} color="#FFB800" />
            <Text style={styles.statValue}>{stats.perfectScores}</Text>
            <Text style={styles.statLabel}>Perfect</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#FFE5F0" }]}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color="#FF3B30"
            />
            <Text style={styles.statValue}>{stats.passedCount}</Text>
            <Text style={styles.statLabel}>Passed</Text>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["All", "Quiz", "Challenge", "Project"].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.activeCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Section */}
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>
            {filteredResults.length > 0
              ? `${filteredResults.length} Result${
                  filteredResults.length > 1 ? "s" : ""
                }`
              : "No results"}
          </Text>
          {filteredResults.map((result) => (
            <TouchableOpacity
              key={result.id}
              style={styles.resultCard}
              onPress={() =>
                setExpandedResult(
                  expandedResult === result.id ? null : result.id,
                )
              }
            >
              <View style={styles.resultHeader}>
                <Text style={styles.icon}>{result.icon}</Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                  <View style={styles.resultMeta}>
                    <Text style={styles.resultDate}>{result.date}</Text>
                    <Text style={styles.resultCategory}>{result.category}</Text>
                  </View>
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
                    {
                      width: `${(result.score / result.maxScore) * 100}%`,
                      backgroundColor: getScoreColor(result.score),
                    },
                  ]}
                />
              </View>

              {/* Expanded Details */}
              {expandedResult === result.id && (
                <View style={styles.expandedContent}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Duration:</Text>
                    <Text style={styles.detailValue}>{result.duration}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Questions:</Text>
                    <Text style={styles.detailValue}>
                      {Math.round((result.score / result.maxScore) * 20)} / 20
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={() => handleRetakeQuiz(result.id)}
                  >
                    <MaterialCommunityIcons
                      name="refresh"
                      size={16}
                      color="#fff"
                    />
                    <Text style={styles.retakeButtonText}>Retake</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "#34C759";
  if (score >= 70) return "#FFB800";
  return "#FF3B30";
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  statCard: {
    width: (Dimensions.get("window").width - 60) / 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: "#F2F2F7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: "#007AFF",
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  resultsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: "#F9F9FB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderColor: "#E5E5EA",
    borderWidth: 1,
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
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  resultDate: {
    fontSize: 11,
    color: "#999",
  },
  resultCategory: {
    fontSize: 11,
    color: "#007AFF",
    fontWeight: "500",
    backgroundColor: "#E5F3FF",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  scoreSection: {
    alignItems: "flex-end",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  maxScore: {
    fontSize: 12,
    color: "#999",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E5EA",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  expandedContent: {
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomColor: "#F2F2F7",
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
  retakeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },
  retakeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
