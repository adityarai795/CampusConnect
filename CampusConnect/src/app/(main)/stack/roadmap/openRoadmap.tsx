import api from "@/src/services/api";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { useNavigation } from "expo-router/build/exports";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
// import { useRoute } from "@react-navigation/native";
import { useRoute, RouteProp } from "@react-navigation/native";

// 👇 Define params type
type RootStackParamList = {
  openRoadmap: { id: string };
};

// 👇 Create typed route
type OpenRoadmapRouteProp = RouteProp<RootStackParamList, "openRoadmap">;
const OpenRoadmap = () => {
    const navigation = useNavigation<any>();
  const route = useRoute<OpenRoadmapRouteProp>();
      const { id } = route.params;

  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchroadmapData = async () => {

    try {
      const response = await api.get(`/roadmap/get/${id}`);

      // IMPORTANT 👇 (check your API structure)
      setRoadmapData(response.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchroadmapData();
  }, []);

  // 🔥 LOADING UI
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading Roadmap...</Text>
      </View>
    );
  }

  // 🔥 SAFETY CHECK
  if (!roadmapData) {
    return (
      <View style={styles.center}>
        <Text>No Data Found</Text>
      </View>
    );
  }
return (
  <ScrollView style={styles.container}>
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>
    </View>
    {/* Header */}
    <Text style={styles.title}>{roadmapData?.title}</Text>
    <Text style={styles.description}>{roadmapData?.description}</Text>

    <View style={styles.badgeRow}>
      <Text style={styles.badge}>{roadmapData?.category}</Text>
      <Text style={styles.badge}>{roadmapData?.level}</Text>
    </View>

    {/* Tags */}
    <View style={styles.tagsContainer}>
      {roadmapData?.tags?.map((tag: any, index: any) => (
        <Text key={index} style={styles.tag}>
          #{tag}
        </Text>
      ))}
    </View>

    {/* Steps */}
    {roadmapData?.steps?.map((step: any, index: any) => (
      <View key={index} style={styles.stepCard}>
        <Text style={styles.stepTitle}>
          {step?.order}. {step?.title}
        </Text>

        <Text style={styles.stepDesc}>{step?.description}</Text>

        {/* Resources */}
        {step?.resources?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📺 Resources</Text>
            {step.resources.map((res: any, i: any) => (
              <TouchableOpacity
                key={i}
                onPress={() => Linking.openURL(res.link)}
              >
                <Text style={styles.link}>• {res.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Useful Links */}
        {step?.usefulLinks?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔗 Useful Links</Text>
            {step.usefulLinks.map((link: any, i: any) => (
              <TouchableOpacity
                key={i}
                onPress={() => Linking.openURL(link.link)}
              >
                <Text style={styles.link}>• {link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    ))}
  </ScrollView>
);
};

export default OpenRoadmap;

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    color: "#555",
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
  },
  stepCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stepDesc: {
    color: "#666",
    marginBottom: 8,
  },
  section: {
    marginTop: 6,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  link: {
    color: "#2563eb",
    marginBottom: 2,
  },
});