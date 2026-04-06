import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { Card, Typography, Badge } from "../../components/common";
import { SPACING, COLORS, DIFFICULTY_LEVELS } from "../../constants";
import { CodingProblem } from "../../types";

// Mock data
const mockProblems: CodingProblem[] = [
  {
    _id: "1",
    title: "Two Sum",
    description: "Find two numbers that add up to target",
    difficulty: "easy",
    category: "Array",
    examples: [],
    constraints: [],
    testCases: [],
    submissions: 1234,
    acceptanceRate: 45.5,
  },
  {
    _id: "2",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the longest substring without repeating characters",
    difficulty: "medium",
    category: "String",
    examples: [],
    constraints: [],
    testCases: [],
    submissions: 890,
    acceptanceRate: 38.2,
  },
  {
    _id: "3",
    title: "Regular Expression Matching",
    description: "Implement regex matching with . and *",
    difficulty: "hard",
    category: "Dynamic Programming",
    examples: [],
    constraints: [],
    testCases: [],
    submissions: 345,
    acceptanceRate: 22.1,
  },
];

interface CodingProblemsPageProps {
  onProblemSelect?: (problem: CodingProblem) => void;
}

export const CodingProblemsPage: React.FC<CodingProblemsPageProps> = ({
  onProblemSelect,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      padding: SPACING.lg,
      backgroundColor: COLORS.primary,
    },
    headerTitle: {
      color: "#FFFFFF",
      marginBottom: SPACING.sm,
    },
    content: {
      padding: SPACING.lg,
    },
    problemCard: {
      marginBottom: SPACING.md,
    },
    problemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: SPACING.md,
    },
    problemTitle: {
      flex: 1,
      marginRight: SPACING.md,
    },
    problemStats: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: SPACING.md,
      paddingTop: SPACING.md,
      borderTopWidth: 1,
      borderTopColor: COLORS.gray200,
    },
    stat: {
      alignItems: "center",
    },
    statValue: {
      fontWeight: "700",
      color: COLORS.text,
    },
    statLabel: {
      color: COLORS.textSecondary,
      fontSize: 12,
      marginTop: SPACING.xs,
    },
  });

  const getDifficultyColor = (difficulty: string) => {
    const level = DIFFICULTY_LEVELS.find((l) => l.value === difficulty);
    return level?.color || COLORS.primary;
  };

  const renderProblem = ({ item }: { item: CodingProblem }) => (
    <Card style={styles.problemCard} onPress={() => onProblemSelect?.(item)}>
      <View style={styles.problemHeader}>
        <View style={styles.problemTitle}>
          <Typography variant="h4" weight="600">
            {item.title}
          </Typography>
          <Typography
            variant="body"
            color={COLORS.textSecondary}
            style={{ marginTop: SPACING.sm }}
          >
            {item.category}
          </Typography>
        </View>
        <Badge
          label={item.difficulty}
          variant={
            item.difficulty === "easy"
              ? "success"
              : item.difficulty === "medium"
                ? "warning"
                : "error"
          }
          size="sm"
        />
      </View>

      <Typography
        variant="body"
        color={COLORS.textSecondary}
        style={{ lineHeight: 20 }}
        numberOfLines={2}
      >
        {item.description}
      </Typography>

      <View style={styles.problemStats}>
        <View style={styles.stat}>
          <Typography style={styles.statValue}>{item.submissions}</Typography>
          <Typography style={styles.statLabel}>Submissions</Typography>
        </View>
        <View style={styles.stat}>
          <Typography style={styles.statValue}>
            {item.acceptanceRate}%
          </Typography>
          <Typography style={styles.statLabel}>Acceptance</Typography>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" weight="700" style={styles.headerTitle}>
          Coding Problems
        </Typography>
        <Typography style={{ color: "rgba(255, 255, 255, 0.8)" }}>
          Master data structures and algorithms
        </Typography>
      </View>

      <FlatList
        data={mockProblems}
        renderItem={renderProblem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.content}
        scrollEnabled
      />
    </View>
  );
};
