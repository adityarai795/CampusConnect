import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_AMBASSADORS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer",
    icon: "👩‍💼",
    followers: 1200,
    isFollowing: false,
  }
];

const Ambassador = () => {
  const navigation = useNavigation<any>();

  // ===== STATE =====
  const [ambassadors, setAmbassadors] = useState(INITIAL_AMBASSADORS);
  const fetchAmbassadors = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await api.get("/auth/ambassadors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAmbassadors(response.data.ambassadors);
    } catch (error) {
      console.error("Error fetching ambassadors:", error);
    }
  }
  useEffect(() => {
    fetchAmbassadors();
  }, []);
  // ===== HANDLERS =====
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFollowAmbassador = useCallback((id: number) => {
    setAmbassadors((prev) =>
      prev.map((amb) => {
        if (amb.id === id) {
          return {
            ...amb,
            isFollowing: !amb.isFollowing,
            followers: amb.isFollowing ? amb.followers - 1 : amb.followers + 1,
          };
        }
        return amb;
      }),
    );
  }, []);

  const handleApplyAmbassador = useCallback(() => {
    Alert.alert(
      "Ambassador Program",
      "Thank you for your interest! Your application has been submitted.",
      [{ text: "OK", onPress: () => console.log("Application submitted") }],
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Ambassador</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            <MaterialCommunityIcons name="star" size={48} color="#FFB800" />
            <Text style={styles.heading}>Join Our Ambassador Program</Text>
            <Text style={styles.description}>
              Become a CampusConnect ambassador and help others grow their
              coding skills. Get exclusive perks and recognition.
            </Text>
            <TouchableOpacity
              style={styles.button}
              // onPress={handleApplyAmbassador}
              onPress={()=>{navigation.navigate("applyAmbassdor");}}
            >
              <Text style={styles.buttonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Ambassadors</Text>
            {ambassadors.map((ambassador) => (
              <View key={ambassador.id} style={styles.ambassadorCard}>
                <Text style={styles.ambassadorIcon}>{ambassador.icon}</Text>
                <View style={styles.ambassadorInfo}>
                  <Text style={styles.ambassadorName}>{ambassador.name}</Text>
                  <Text style={styles.ambassadorRole}>{ambassador.role}</Text>
                </View>
                <TouchableOpacity
                  style={styles.followersSection}
                  onPress={() => handleFollowAmbassador(ambassador.id)}
                >
                  <MaterialCommunityIcons
                    name={ambassador.isFollowing ? "heart" : "heart-outline"}
                    size={16}
                    color={ambassador.isFollowing ? "#FF3B30" : "#999"}
                  />
                  <Text style={styles.followers}>{ambassador.followers}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ambassador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderColor: "#FFB800",
    borderWidth: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#FFB800",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  ambassadorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  ambassadorIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  ambassadorInfo: {
    flex: 1,
  },
  ambassadorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  ambassadorRole: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  followersSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  followers: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
});
