import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// ============================================
// CONSTANTS & THEME
// ============================================

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

const INITIAL_PROFILE = {
  name: "Aditya Rai",
  email: "adityrai742@gmail.com",
  mobileno: "+91 9839930768",
  academicDetails: [
    {
      institutionName: "Bansal Institute of Engineering and Technology",
      branch: "Computer Science",
      semester: "6th Semester",
      rollNumber: "BIT2021001",
      score: "8.5 CGPA",
    },
  ],
  skills: ["React", "Node.js", "MongoDB", "Java", "Python", "Firebase"],
  certifications: [],
  socialLinks: {
    linkedin: "",
    github: "",
    leetcode: "",
  },
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

const EditableInfoItem = ({
  icon,
  label,
  value,
  onChangeText,
  isEditing,
}: {
  icon: string;
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  isEditing?: boolean;
}) => (
  <View style={styles.infoRow}>
    <MaterialCommunityIcons
      name={icon as any}
      size={20}
      color={COLORS.primary}
    />
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.textLight}
        />
      ) : (
        <Text style={styles.infoValue}>{value}</Text>
      )}
    </View>
  </View>
);

const SkillTag = ({
  skill,
  isEditing,
  onRemove,
}: {
  skill: string;
  isEditing?: boolean;
  onRemove?: () => void;
}) => (
  <View style={styles.skill}>
    <Text style={styles.skillText}>{skill}</Text>
    {isEditing && (
      <TouchableOpacity onPress={onRemove} style={styles.skillRemoveBtn}>
        <MaterialCommunityIcons name="close" size={14} color={COLORS.primary} />
      </TouchableOpacity>
    )}
  </View>
);

const ActionButton = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.actionBtn}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.actionIconContainer}>
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={COLORS.primary}
      />
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

  // ===== STATE =====
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [profileData, setProfileData] = useState(INITIAL_PROFILE);

  // ===== HANDLERS =====

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEditToggle = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSocialLinkChange = useCallback(
    (platform: string, value: string) => {
      setProfileData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value,
        },
      }));
    },
    [],
  );

  const handleAddSkill = useCallback(() => {
    if (newSkill.trim()) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
      setShowAddSkillModal(false);
    }
  }, [newSkill]);

  const handleRemoveSkill = useCallback((index: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSaveProfile = useCallback(() => {
    // TODO: API call to save profile data
    console.log("Profile saved:", profileData);
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  }, [profileData]);

  const handleLogout = useCallback(() => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // TODO: Clear auth and navigate to login
          console.log("User logged out");
        },
      },
    ]);
  }, []);

  const handleMyNotes = useCallback(() => {
    navigation.goBack();
    // TODO: Navigate to MyNotes when implemented
  }, [navigation]);

  const handleBookmarked = useCallback(() => {
    navigation.goBack();
    // TODO: Navigate to Bookmarked when implemented
  }, [navigation]);

  const handleApplications = useCallback(() => {
    navigation.goBack();
    // TODO: Navigate to Applications when implemented
  }, [navigation]);

  // ===== RENDER =====

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
              color={COLORS.white}
            />
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
          {!isEditing && (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={handleEditToggle}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ===== BASIC INFORMATION ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Basic Information</Text>
          <EditableInfoItem
            icon="account-outline"
            label="Full Name"
            value={profileData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            isEditing={isEditing}
          />
          <View style={styles.divider} />
          <EditableInfoItem
            icon="email-outline"
            label="Email Address"
            value={profileData.email}
            isEditing={false}
          />
          <View style={styles.divider} />
          <EditableInfoItem
            icon="phone-outline"
            label="Phone Number"
            value={profileData.mobileno}
            onChangeText={(value) => handleInputChange("mobileno", value)}
            isEditing={isEditing}
          />
        </View>

        {/* ===== ACADEMIC DETAILS ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Academic Details</Text>
          {profileData.academicDetails.map((academic, index) => (
            <View key={index}>
              <EditableInfoItem
                icon="school-outline"
                label="Institution"
                value={academic.institutionName}
                onChangeText={(value) => {
                  setProfileData((prev) => {
                    const updated = [...prev.academicDetails];
                    updated[index].institutionName = value;
                    return { ...prev, academicDetails: updated };
                  });
                }}
                isEditing={isEditing}
              />
              <View style={styles.divider} />
              <EditableInfoItem
                icon="book-outline"
                label="Branch"
                value={academic.branch}
                onChangeText={(value) => {
                  setProfileData((prev) => {
                    const updated = [...prev.academicDetails];
                    updated[index].branch = value;
                    return { ...prev, academicDetails: updated };
                  });
                }}
                isEditing={isEditing}
              />
              <View style={styles.divider} />
              <EditableInfoItem
                icon="calendar-outline"
                label="Semester"
                value={academic.semester}
                onChangeText={(value) => {
                  setProfileData((prev) => {
                    const updated = [...prev.academicDetails];
                    updated[index].semester = value;
                    return { ...prev, academicDetails: updated };
                  });
                }}
                isEditing={isEditing}
              />
              <View style={styles.divider} />
              <EditableInfoItem
                icon="id-card-outline"
                label="Roll Number"
                value={academic.rollNumber}
                onChangeText={(value) => {
                  setProfileData((prev) => {
                    const updated = [...prev.academicDetails];
                    updated[index].rollNumber = value;
                    return { ...prev, academicDetails: updated };
                  });
                }}
                isEditing={isEditing}
              />
              <View style={styles.divider} />
              <EditableInfoItem
                icon="chart-line"
                label="CGPA / Score"
                value={academic.score}
                onChangeText={(value) => {
                  setProfileData((prev) => {
                    const updated = [...prev.academicDetails];
                    updated[index].score = value;
                    return { ...prev, academicDetails: updated };
                  });
                }}
                isEditing={isEditing}
              />
            </View>
          ))}
        </View>

        {/* ===== SKILLS ===== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Technical Skills</Text>
            {isEditing && (
              <TouchableOpacity
                onPress={() => setShowAddSkillModal(true)}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              >
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.skillContainer}>
            {profileData.skills.length > 0 ? (
              profileData.skills.map((skill, index) => (
                <SkillTag
                  key={index}
                  skill={skill}
                  isEditing={isEditing}
                  onRemove={() => handleRemoveSkill(index)}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>No skills added</Text>
            )}
          </View>
        </View>

        {/* ===== SOCIAL LINKS ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Professional Links</Text>
          <EditableInfoItem
            icon="linkedin"
            label="LinkedIn"
            value={profileData.socialLinks.linkedin}
            onChangeText={(value) => handleSocialLinkChange("linkedin", value)}
            isEditing={isEditing}
          />
          <View style={styles.divider} />
          <EditableInfoItem
            icon="github"
            label="GitHub"
            value={profileData.socialLinks.github}
            onChangeText={(value) => handleSocialLinkChange("github", value)}
            isEditing={isEditing}
          />
          <View style={styles.divider} />
          <EditableInfoItem
            icon="code-braces"
            label="LeetCode"
            value={profileData.socialLinks.leetcode}
            onChangeText={(value) => handleSocialLinkChange("leetcode", value)}
            isEditing={isEditing}
          />
        </View>

        {/* ===== ACTION BUTTONS FOR EDIT MODE ===== */}
        {isEditing && (
          <View style={styles.editActionContainer}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSaveProfile}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="content-save"
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleEditToggle}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ===== QUICK ACTIONS ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <ActionButton
            icon="book-open-outline"
            label="My Notes"
            onPress={handleMyNotes}
          />
          <ActionButton
            icon="bookmark-outline"
            label="Bookmarked"
            onPress={handleBookmarked}
          />
          <ActionButton
            icon="briefcase-outline"
            label="Applications"
            onPress={handleApplications}
          />
        </View>
      </ScrollView>

      {/* ===== ADD SKILL MODAL ===== */}
      <Modal
        visible={showAddSkillModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddSkillModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a Skill</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., React, Python, AWS..."
              placeholderTextColor={COLORS.textLight}
              value={newSkill}
              onChangeText={setNewSkill}
              autoFocus
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowAddSkillModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalAddBtn}
                onPress={handleAddSkill}
              >
                <Text style={styles.modalAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "rgba(255,255,255,0.2)",
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

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
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

  editInput: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 0,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  skillText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  skillRemoveBtn: {
    padding: 2,
  },

  emptyText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontStyle: "italic",
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

  /* EDIT MODE ACTIONS */
  editActionContainer: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 12,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 3,
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  saveBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: COLORS.textGray,
    paddingVertical: 14,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
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

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },

  modalInput: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 16,
  },

  modalButtonContainer: {
    flexDirection: "row",
    gap: 12,
  },

  modalCancelBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  modalCancelText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },

  modalAddBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  modalAddText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
