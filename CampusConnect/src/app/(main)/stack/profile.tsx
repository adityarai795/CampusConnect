import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// ============================================
// CONSTANTS & THEME
// ============================================
const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#4A6CF7",
  primaryLight: "#E8ECFF",
  background: "#F8F9FE",
  white: "#FFFFFF",
  text: "#1a1a1a",
  textGray: "#666666",
  textLight: "#999999",
  error: "#FF4D4D",
  success: "#4CAF50",
  shadow: "#000000",
};

const profileData = {
  name: "Aditya Rai",
  email: "adityrai742@gmail.com",
  phone: "+91 9839930768",
  college: "Bansal Institute of Engineering and Technology",
  branch: "Computer Science",
  semester: "6th Semester",
  skills: ["React", "Node.js", "MongoDB", "Java", "Python", "Firebase"],
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

const HeaderBar = ({ onBackPress }: { onBackPress: () => void }) => (
  <View style={styles.navbar}>
    <TouchableOpacity
      onPress={onBackPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <MaterialCommunityIcons
        name="chevron-left"
        size={26}
        color={COLORS.text}
      />
    </TouchableOpacity>
    <Text style={styles.navTitle}>Profile</Text>
    <View style={{ width: 40 }} />
  </View>
);

const InfoItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <MaterialCommunityIcons name={icon} size={20} color={COLORS.primary} />
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const SkillTag = ({ skill }: { skill: string }) => (
  <View style={styles.skill}>
    <Text style={styles.skillText}>{skill}</Text>
  </View>
);

const ActionButton = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
  <TouchableOpacity
    style={styles.actionBtn}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.actionIconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
    </View>
    <Text style={styles.actionText}>{label}</Text>
    <MaterialCommunityIcons
      name="chevron-right"
      size={20}
      color={COLORS.textLight}
    />
  </TouchableOpacity>
);

// ============================================
// MAIN COMPONENT
// ============================================

const Profile = () => {
  const navigation = useNavigation();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEditProfile = useCallback(() => {
    // Navigate to edit profile screen
    console.log("Edit Profile");
  }, []);

  const handleLogout = useCallback(() => {
    // Handle logout
    console.log("Logout");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HeaderBar onBackPress={handleBackPress} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== PROFILE HEADER ===== */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons
              name="account-circle"
              size={80}
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ===== BASIC INFORMATION ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <InfoItem
            icon="email-outline"
            label="Email"
            value={profileData.email}
          />
          <View style={styles.divider} />
          <InfoItem
            icon="phone-outline"
            label="Phone"
            value={profileData.phone}
          />
        </View>

        {/* ===== ACADEMIC DETAILS ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Academic Details</Text>
          <InfoItem
            icon="school-outline"
            label="College"
            value={profileData.college}
          />
          <View style={styles.divider} />
          <InfoItem
            icon="book-outline"
            label="Branch"
            value={profileData.branch}
          />
          <View style={styles.divider} />
          <InfoItem
            icon="calendar-outline"
            label="Semester"
            value={profileData.semester}
          />
        </View>

        {/* ===== SKILLS ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Technical Skills</Text>
          <View style={styles.skillContainer}>
            {profileData.skills.map((skill, index) => (
              <SkillTag key={index} skill={skill} />
            ))}
          </View>
        </View>

        {/* ===== QUICK ACTIONS ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <ActionButton
            icon="book-open-outline"
            label="My Notes"
            onPress={() => {}}
          />
          <ActionButton
            icon="bookmark-outline"
            label="Bookmarked"
            onPress={() => {}}
          />
          <ActionButton
            icon="briefcase-outline"
            label="Applications"
            onPress={() => {}}
          />
        </View>

        {/* ===== LOGOUT BUTTON ===== */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="logout"
            size={22}
            color={COLORS.white}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  /* NAVBAR */
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  navTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 0.3,
  },

  /* PROFILE HEADER */
  profileHeader: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  avatar: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 5,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  name: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 6,
    letterSpacing: 0.2,
  },

  email: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    marginBottom: 16,
    fontWeight: "500",
  },

  editBtn: {
    marginTop: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },

  editText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 14,
  },

  /* CARDS */
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: COLORS.text,
    letterSpacing: 0.3,
  },

  /* INFO ITEMS */
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    gap: 12,
  },

  infoContent: {
    flex: 1,
    justifyContent: "center",
  },

  infoLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
  },

  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },

  /* SKILLS */
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  skill: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#d0d8ff",
  },

  skillText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  /* ACTION BUTTONS */
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginVertical: 4,
    borderRadius: 12,
  },

  actionIconContainer: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    flex: 1,
  },

  /* LOGOUT */
  logoutBtn: {
    backgroundColor: COLORS.error,
    marginHorizontal: 20,
    marginVertical: 24,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 3,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  logoutText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
