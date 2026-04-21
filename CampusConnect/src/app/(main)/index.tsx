import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import api from "@/src/services/api";

const { width } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation<any>();

  const handleNavigate = useCallback(
    (route: string) => {
      navigation.navigate(route);
    },
    [navigation],
  );

  const quickAccessItems = [
    {
      icon: "file-document",
      label: "Resume",
      route: "resume",
      color: "#FF9500",
    },
    {
      icon: "shopping",
      label: "Market Place",
      route: "marketplace",
      color: "#34C759",
    },
    { icon: "brain", label: "Quiz", route: "quiz", color: "#5AC8FA" },
    {
      icon: "star",
      label: "Ambassador",
      route: "ambassador",
      color: "#FFB800",
    },
    { icon: "road", label: "Roadmap", route: "roadmap", color: "#007AFF" },
    { icon: "book", label: "Resources", route: "resources", color: "#AF52DE" },
  ];

  const features = [
    {
      id: 1,
      icon: "chart-line",
      title: "Track Progress",
      description: "Monitor your learning journey",
      color: "#007AFF",
    },
    {
      id: 2,
      icon: "star",
      title: "Earn Badges",
      description: "Complete challenges and get rewards",
      color: "#FFB800",
    },
    {
      id: 3,
      icon: "people",
      title: "Join Community",
      description: "Connect with other learners",
      color: "#FF3B30",
    },
  ];
  
  const [homeData, setHomeData] = React.useState<any>(null);
  const fetchHomeData = async () => {
    try {
      const response = await api.get("/home/homepagedata");
      setHomeData(response.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  }

  useEffect(() => {
    fetchHomeData();
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <View style={styles.bannerSection}>
          <View style={styles.banner}>
            {/* LEFT CONTENT */}
            <View style={{ flex: 1 }}>
              <Text style={styles.badge}>🎓 Campus Platform</Text>

              <Text style={styles.bannerTitle}>
                One Stop Solution for{" "}
                <Text style={styles.highlight}>Students</Text>
              </Text>

              <Text style={styles.bannerSubtitle}>
                Learn, grow and explore everything in one place.
              </Text>

              {/* CTA Buttons */}
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => handleNavigate("result")}
              >
                <Text style={styles.primaryText}>Explore Results</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => handleNavigate("jobs")}
              >
                <Text style={styles.secondaryText}>Browse Jobs</Text>
              </TouchableOpacity>
            </View>

            {/* RIGHT ICON */}
            <MaterialCommunityIcons
              name="rocket-launch"
              size={60}
              color="#fff"
            />
          </View>
        </View>

        <View style={styles.statsSection}>
          {/* ROW 1 */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: "#EBF5FF" }]}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={24}
                color="#007AFF"
              />
              <Text style={styles.statValue}>
                {homeData?.totalResources || 0}
              </Text>
              <Text style={styles.statLabel}>Resources</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: "#F0FEF3" }]}>
              <MaterialCommunityIcons
                name="briefcase"
                size={24}
                color="#34C759"
              />
              <Text style={styles.statValue}>{homeData?.totalJobs || 0}</Text>
              <Text style={styles.statLabel}>Jobs</Text>
            </View>
          </View>

          {/* ROW 2 */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: "#FFF4E5" }]}>
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color="#FF9500"
              />
              <Text style={styles.statValue}>{homeData?.totalUsers || 0}</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: "#F3E8FF" }]}>
              <MaterialCommunityIcons name="school" size={24} color="#AF52DE" />
              <Text style={styles.statValue}>
                {homeData?.totalResults || 0}
              </Text>
              <Text style={styles.statLabel}>Universities</Text>
            </View>
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.quickAccessSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {quickAccessItems.map((item) => (
              <TouchableOpacity
                key={item.route}
                style={styles.gridCard}
                onPress={() => handleNavigate(item.route)}
              >
                <View
                  style={[
                    styles.iconBg,
                    { backgroundColor: `${item.color}20` },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={28}
                    color={item.color}
                  />
                </View>
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Features */}
        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Key Features</Text>
          </View>
          {features.map((feature) => (
            <TouchableOpacity key={feature.id} style={styles.featureCard}>
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: `${feature.color}15` },
                ]}
              >
                <MaterialCommunityIcons
                  name={feature.icon as any}
                  size={24}
                  color={feature.color}
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.description}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Call to Action */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => handleNavigate("community")}
        >
          <MaterialCommunityIcons name="forum" size={20} color="#fff" />
          <Text style={styles.ctaText}>Join Our Community</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  statBox: {
    width: "48%",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 6,
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  bannerSection: {
    padding: 20,
  },

  banner: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 8,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  highlight: {
    color: "#FFD700",
  },

  bannerSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginVertical: 8,
  },

  primaryBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },

  primaryText: {
    color: "#007AFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 6,
  },

  secondaryText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },  
  
  quickAccessSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
  },
  gridCard: {
    width: (width - 60) / 3,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9FB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderColor: "#E5E5EA",
    borderWidth: 1,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  featureDesc: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  ctaButton: {
    marginHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
