import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Card, Typography, Button } from "../../../../components/common";
import { SPACING, COLORS } from "../../../../constants";

export default function JobDetailsScreen() {
  const { id: jobId } = useLocalSearchParams();

  const mockJobDetails = {
    _id: jobId,
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    description:
      "We are looking for a senior frontend developer with 5+ years of experience in building scalable web applications.",
    location: "Bangalore, India",
    salary: "₹15-25 LPA",
    jobType: "fulltime",
    requirements: ["React", "TypeScript", "Tailwind CSS", "Redux", "Node.js"],
    responsibilities: [
      "Design and develop user interfaces using React",
      "Collaborate with backend engineers to integrate APIs",
      "Optimize application performance",
      "Mentor junior developers",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible working hours",
      "Work from home",
      "Professional development",
    ],
    postedAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: [],
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      backgroundColor: COLORS.primary,
      padding: SPACING.lg,
      paddingTop: SPACING["2xl"],
    },
    headerTitle: {
      color: "#FFFFFF",
      marginBottom: SPACING.sm,
    },
    headerSubtitle: {
      color: "rgba(255, 255, 255, 0.9)",
    },
    content: {
      padding: SPACING.lg,
    },
    section: {
      marginBottom: SPACING["2xl"],
    },
    sectionTitle: {
      marginBottom: SPACING.md,
    },
    listItem: {
      flexDirection: "row",
      marginBottom: SPACING.md,
    },
    bullet: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    bulletText: {
      fontSize: 10,
    },
    listItemContent: {
      flex: 1,
      marginLeft: SPACING.md,
      justifyContent: "center",
    },
    footer: {
      padding: SPACING.lg,
      borderTopWidth: 1,
      borderTopColor: COLORS.gray200,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" weight="700" style={styles.headerTitle}>
          {mockJobDetails.title}
        </Typography>
        <Typography style={styles.headerSubtitle}>
          {mockJobDetails.company} • {mockJobDetails.location}
        </Typography>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card>
          <Typography
            variant="h4"
            weight="600"
            style={{ marginBottom: SPACING.md }}
          >
            {mockJobDetails.salary}
          </Typography>
          <Typography variant="body" color={COLORS.textSecondary}>
            {mockJobDetails.description}
          </Typography>
        </Card>

        <View style={styles.section}>
          <Typography variant="h4" weight="600" style={styles.sectionTitle}>
            Requirements
          </Typography>
          {mockJobDetails.requirements.map((req, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet}>
                <Typography style={styles.bulletText}>✓</Typography>
              </View>
              <View style={styles.listItemContent}>
                <Typography variant="body">{req}</Typography>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Typography variant="h4" weight="600" style={styles.sectionTitle}>
            Responsibilities
          </Typography>
          {mockJobDetails.responsibilities.map((resp, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet}>
                <Typography style={styles.bulletText}>•</Typography>
              </View>
              <View style={styles.listItemContent}>
                <Typography variant="body">{resp}</Typography>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Typography variant="h4" weight="600" style={styles.sectionTitle}>
            Benefits
          </Typography>
          {mockJobDetails.benefits.map((benefit, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet}>
                <Typography style={styles.bulletText}>★</Typography>
              </View>
              <View style={styles.listItemContent}>
                <Typography variant="body">{benefit}</Typography>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Apply Now"
          onPress={() => {}}
          variant="primary"
          size="lg"
        />
        <Button
          title="Save Job"
          onPress={() => {}}
          variant="outline"
          size="lg"
          style={{ marginTop: SPACING.md }}
        />
      </View>
    </ScrollView>
  );
}
