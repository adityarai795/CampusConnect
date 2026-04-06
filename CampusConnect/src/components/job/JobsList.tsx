import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { Card, Typography, Badge } from "../../components/common";
import { SPACING, COLORS } from "../../constants";
import { Job } from "../../types";

// Mock data
const mockJobs: Job[] = [
  {
    _id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    description:
      "We are looking for a senior frontend developer with 5+ years of experience",
    location: "Bangalore, India",
    salary: "₹15-25 LPA",
    jobType: "fulltime",
    requirements: ["React", "TypeScript", "Tailwind CSS"],
    postedAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: [],
  },
  {
    _id: "2",
    title: "Backend Engineer",
    company: "StartUp XYZ",
    description: "Build scalable backend systems using Node.js and MongoDB",
    location: "Mumbai, India",
    salary: "₹10-18 LPA",
    jobType: "fulltime",
    requirements: ["Node.js", "MongoDB", "REST APIs"],
    postedAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: [],
  },
];

interface JobsPageProps {
  onJobSelect?: (job: Job) => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({ onJobSelect }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      padding: SPACING.lg,
      backgroundColor: COLORS.secondary,
    },
    headerTitle: {
      color: "#FFFFFF",
      marginBottom: SPACING.sm,
    },
    content: {
      padding: SPACING.lg,
    },
    jobCard: {
      marginBottom: SPACING.md,
    },
    jobHeader: {
      marginBottom: SPACING.md,
    },
    companyName: {
      color: COLORS.primary,
      marginBottom: SPACING.xs,
    },
    salary: {
      color: COLORS.success,
      fontWeight: "600",
      marginTop: SPACING.sm,
    },
    location: {
      color: COLORS.textSecondary,
      marginTop: SPACING.sm,
    },
    tags: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: SPACING.sm,
      marginTop: SPACING.md,
    },
  });

  const renderJob = ({ item }: { item: Job }) => (
    <Card style={styles.jobCard} onPress={() => onJobSelect?.(item)}>
      <View>
        <Typography variant="caption" style={styles.companyName}>
          {item.company}
        </Typography>
        <Typography variant="h4" weight="600" style={styles.jobHeader}>
          {item.title}
        </Typography>
        <Typography
          variant="body"
          color={COLORS.textSecondary}
          numberOfLines={2}
        >
          {item.description}
        </Typography>

        <Typography style={styles.location}>{item.location}</Typography>
        {item.salary && (
          <Typography style={styles.salary}>{item.salary}</Typography>
        )}

        <View style={styles.tags}>
          {item.requirements.slice(0, 3).map((skill, index) => (
            <Badge key={index} label={skill} variant="primary" size="sm" />
          ))}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" weight="700" style={styles.headerTitle}>
          Job Opportunities
        </Typography>
        <Typography style={{ color: "rgba(255, 255, 255, 0.8)" }}>
          Find your dream role
        </Typography>
      </View>

      <FlatList
        data={mockJobs}
        renderItem={renderJob}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.content}
        scrollEnabled
      />
    </View>
  );
};
