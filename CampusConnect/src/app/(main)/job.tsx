import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
const Job = () => {
  const jobs = [
    {
      id: 1,
      company: "Tech Startups Inc",
      position: "Junior React Developer",
      location: "Remote",
      salary: "$50k - $70k",
      icon: "🏢",
    },
    {
      id: 2,
      company: "Digital Solutions Ltd",
      position: "Full Stack Developer",
      location: "New York, NY",
      salary: "$80k - $120k",
      icon: "🏭",
    },
    {
      id: 3,
      company: "Cloud Systems Corp",
      position: "Backend Engineer",
      location: "San Francisco, CA",
      salary: "$90k - $130k",
      icon: "☁️",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Job Opportunities</Text>
          <Text style={styles.subtitle}>Find your next career opportunity</Text>
        </View>

        <View style={styles.filterSection}>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="filter" size={16} color="#007AFF" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="magnify" size={16} color="#007AFF" />
            <Text style={styles.filterText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jobsSection}>
          {jobs.map((job) => (
            <TouchableOpacity key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobIcon}>{job.icon}</Text>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.position}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                </View>
              </View>
              <View style={styles.jobDetails}>
                <View style={styles.detail}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={14}
                    color="#666"
                  />
                  <Text style={styles.detailText}>{job.location}</Text>
                </View>
                <View style={styles.detail}>
                  <MaterialCommunityIcons
                    name="cash"
                    size={14}
                    color="#34C759"
                  />
                  <Text style={styles.detailText}>{job.salary}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Job;

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
  filterSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  filterText: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  jobsSection: {
    paddingHorizontal: 20,
  },
  jobCard: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  jobIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  jobCompany: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  jobDetails: {
    marginBottom: 12,
    gap: 8,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
