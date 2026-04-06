import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { Card, Typography, Button, Badge } from "../../../../components/common";
import { SPACING, COLORS } from "../../../../constants";

const mockResources = [
  {
    id: "1",
    title: "React Fundamentals",
    category: "Frontend",
    type: "Video",
    duration: "4 hrs",
    difficulty: "beginner",
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    category: "Programming",
    type: "Tutorial",
    duration: "6 hrs",
    difficulty: "intermediate",
  },
  {
    id: "3",
    title: "System Design Masterclass",
    category: "Architecture",
    type: "Course",
    duration: "20 hrs",
    difficulty: "advanced",
  },
];

export default function ResourcesScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      backgroundColor: COLORS.accent,
      padding: SPACING.lg,
      paddingTop: SPACING["2xl"],
    },
    headerTitle: {
      color: "#FFFFFF",
      marginBottom: SPACING.sm,
    },
    content: {
      padding: SPACING.lg,
    },
    resourceCard: {
      marginBottom: SPACING.md,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: SPACING.md,
    },
    resourceTitle: {
      flex: 1,
    },
    resourceCategory: {
      marginTop: SPACING.sm,
      color: COLORS.textSecondary,
    },
    meta: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: SPACING.md,
      paddingTop: SPACING.md,
      borderTopWidth: 1,
      borderTopColor: COLORS.gray200,
    },
  });

  const renderResource = ({ item }: any) => (
    <Card style={styles.resourceCard}>
      <View style={styles.cardHeader}>
        <View style={styles.resourceTitle}>
          <Typography variant="h4" weight="600">
            {item.title}
          </Typography>
          <Typography
            variant="body"
            color={COLORS.textSecondary}
            style={styles.resourceCategory}
          >
            {item.category}
          </Typography>
        </View>
        <Badge
          label={item.difficulty}
          variant={
            item.difficulty === "beginner"
              ? "success"
              : item.difficulty === "intermediate"
                ? "warning"
                : "error"
          }
          size="sm"
        />
      </View>

      <View style={styles.meta}>
        <Typography variant="body" color={COLORS.textSecondary}>
          {item.type}
        </Typography>
        <Typography variant="body" weight="600" color={COLORS.primary}>
          {item.duration}
        </Typography>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" weight="700" style={styles.headerTitle}>
          Learning Resources
        </Typography>
        <Typography style={{ color: "rgba(255, 255, 255, 0.8)" }}>
          Learn from the best materials
        </Typography>
      </View>

      <FlatList
        data={mockResources}
        renderItem={renderResource}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        scrollEnabled
      />
    </View>
  );
}
