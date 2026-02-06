import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.appName}>CampusConnect</Text>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Welcome back 👋</Text>
          <Text style={styles.subText}>Stay connected with your campus</Text>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.grid}>
          <FeatureCard
            icon={<MaterialIcons name="campaign" size={26} color="#008069" />}
            title="Announcements"
          />
          <FeatureCard
            icon={<Ionicons name="book-outline" size={26} color="#008069" />}
            title="Resources"
          />
          <FeatureCard
            icon={
              <FontAwesome5 name="calendar-alt" size={24} color="#008069" />
            }
            title="Events"
          />
          <FeatureCard
            icon={
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={26}
                color="#008069"
              />
            }
            title="Connect"
          />
          <FeatureCard
            icon={<Ionicons name="people-outline" size={26} color="#008069" />}
            title="Clubs"
          />
          <FeatureCard
            icon={<Ionicons name="person-outline" size={26} color="#008069" />} 
            title="Profile"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- COMPONENT ---------- */

const FeatureCard = ({ icon, title }: any) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      {icon}
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  header: {
    height: 56,
    backgroundColor: "#008069",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  welcomeBox: {
    padding: 16,
  },

  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  subText: {
    fontSize: 13,
    color: "#667781",
    marginTop: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 14,
    alignItems: "center",
    elevation: 2,
  },

  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});
