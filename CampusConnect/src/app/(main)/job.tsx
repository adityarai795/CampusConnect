import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const Job = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Tech Startups Inc",
      position: "Junior React Developer",
      location: "Remote",
      salary: "$50k - $70k",
      icon: "🏢",
      level: "Junior",
      applied: false,
      type: "Full-time",
    },
    {
      id: 2,
      company: "Digital Solutions Ltd",
      position: "Full Stack Developer",
      location: "New York, NY",
      salary: "$80k - $120k",
      icon: "🏭",
      level: "Senior",
      applied: false,
      type: "Full-time",
    },
    {
      id: 3,
      company: "Cloud Systems Corp",
      position: "Backend Engineer",
      location: "San Francisco, CA",
      salary: "$90k - $130k",
      icon: "☁️",
      level: "Mid",
      applied: false,
      type: "Full-time",
    },
    {
      id: 4,
      company: "Startup Hub",
      position: "Frontend Intern",
      location: "Remote",
      salary: "$20k - $30k",
      icon: "🚀",
      level: "Intern",
      applied: false,
      type: "Internship",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const handleApplyJob = useCallback((jobId: number) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          const newApplied = !job.applied;
          if (newApplied) {
            Alert.alert("Success", "You have applied for this job!");
          }
          return { ...job, applied: newApplied };
        }
        return job;
      }),
    );
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.position.toLowerCase().includes(searchText.toLowerCase()) ||
        job.company.toLowerCase().includes(searchText.toLowerCase());
      const matchesLevel =
        selectedLevel === "All" || job.level === selectedLevel;
      const matchesType = selectedType === "All" || job.type === selectedType;
      return matchesSearch && matchesLevel && matchesType;
    });
  }, [jobs, searchText, selectedLevel, selectedType]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Job Opportunities</Text>
          <Text style={styles.subtitle}>Find your next career opportunity</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={18} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search jobs..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Level Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Level</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["All", "Intern", "Junior", "Mid", "Senior"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.filterButton,
                  selectedLevel === level && styles.activeFilterButton,
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedLevel === level && styles.activeFilterText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Type Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Job Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["All", "Full-time", "Internship"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterButton,
                  selectedType === type && styles.activeFilterButton,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedType === type && styles.activeFilterText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Jobs List */}
        <View style={styles.jobsSection}>
          <Text style={styles.sectionTitle}>
            {filteredJobs.length > 0
              ? `${filteredJobs.length} Job${filteredJobs.length > 1 ? "s" : ""} Found`
              : "No jobs found"}
          </Text>
          {filteredJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobIcon}>{job.icon}</Text>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.position}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                </View>
                <View style={[styles.levelBadge, getLevelColor(job.level)]}>
                  <Text style={styles.levelText}>{job.level}</Text>
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
                <View style={styles.detail}>
                  <MaterialCommunityIcons
                    name="briefcase"
                    size={14}
                    color="#007AFF"
                  />
                  <Text style={styles.detailText}>{job.type}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.applyButton,
                  job.applied && styles.appliedButton,
                ]}
                onPress={() => handleApplyJob(job.id)}
              >
                <MaterialCommunityIcons
                  name={job.applied ? "check" : "send"}
                  size={16}
                  color="#fff"
                />
                <Text style={styles.applyButtonText}>
                  {job.applied ? "Applied" : "Apply Now"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "Intern":
      return { backgroundColor: "#E5F3FF" };
    case "Junior":
      return { backgroundColor: "#E5FFF0" };
    case "Mid":
      return { backgroundColor: "#FFF5E5" };
    case "Senior":
      return { backgroundColor: "#FFE5F0" };
    default:
      return { backgroundColor: "#F2F2F7" };
  }
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
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: "#F2F2F7",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#007AFF",
  },
  filterButtonText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "600",
  },
  jobsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  jobCard: {
    backgroundColor: "#F9F9FB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderColor: "#E5E5EA",
    borderWidth: 1,
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
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  jobCompany: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  levelBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#000",
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
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  appliedButton: {
    backgroundColor: "#34C759",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
