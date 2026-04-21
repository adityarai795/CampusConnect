import React, { useCallback, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import MyJobs from "./myJobs";
import MyNotes from "./myNotes";
import Activity from "./activity";
import { router } from "expo-router";

/* ===================== COLORS ===================== */
const COLORS = {
  primary: "#4A6CF7",
  primaryLight: "#E8ECFF",
  background: "#F8F9FE",
  white: "#FFFFFF",
  text: "#1a1a1a",
  textGray: "#666666",
  textLight: "#999999",
  success: "#4CAF50",
  shadow: "#000000",
};

/* ===================== COMPONENT ===================== */
const Profile = () => {
  const navigation = useNavigation<any>();

  /* ===================== STATE ===================== */
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobileno: "",
    skills: [],
    socialLinks: {
      linkedin: "",
      github: "",
      leetcode: "",
    },
    academicDetails: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  /* ===================== FETCH DATA ===================== */
  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        "https://api.collegeconnect.me/profile/profile_get",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = response.data.data;

      setProfileData({
        name: data.name || "",
        email: data.email || "",
        mobileno: data.mobileno || "",
        skills: data.skills || [],
        socialLinks: data.socialLinks || {
          linkedin: "",
          github: "",
          leetcode: "",
        },
        academicDetails: data.academicDetails || [],
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  /* ===================== HANDLERS ===================== */

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

 
  const handleRemoveSkill = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    Alert.alert("Saved", "Profile updated successfully");
    setIsEditing(false);
  };

  /* ===================== UI ===================== */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="account-circle"
            size={80}
            color="white"
          />
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>

          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.editBtn}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.title}>Basic Info</Text>

          <Text>Name</Text>
          <TextInput
            value={profileData.name}
            editable={isEditing}
            onChangeText={(t) => handleInputChange("name", t)}
            style={styles.input}
          />

          <Text>Email</Text>
          <TextInput
            value={profileData.email}
            editable={false}
            style={styles.input}
          />

          <Text>Phone</Text>
          <TextInput
            value={profileData.mobileno}
            editable={isEditing}
            onChangeText={(t) => handleInputChange("mobileno", t)}
            style={styles.input}
          />
        </View>

        {/* SKILLS */}
        <View style={styles.card}>
          <Text style={styles.title}>Skills</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {profileData.skills?.map((skill, i) => (
              <View key={i} style={styles.skill}>
                <Text>{skill}</Text>
                {isEditing && (
                  <TouchableOpacity onPress={() => handleRemoveSkill(i)}>
                    <Text> ❌</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {isEditing && (
            <TouchableOpacity
              onPress={() => setShowAddSkillModal(true)}
              style={styles.addBtn}
            >
              <Text>Add Skill</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ACADEMICS */}
        <View style={styles.card}>
          <Text style={styles.title}>Academics</Text>

          {profileData.academicDetails?.map((item, index) => (
            <View key={index}>
              {/* <Text>{item.institutionName}</Text> */}
              {/* <Text>{item.rollNumber}</Text> */}
            </View>
          ))}
        </View>

        {/* SAVE BUTTON */}
        {isEditing && (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={showAddSkillModal} transparent>
        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <Text>Add Skill</Text>

            <TextInput
              value={newSkill}
              onChangeText={setNewSkill}
              style={styles.input}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() =>
      {navigation.navigate("myJobs");  }}>Press me to myjob</TouchableOpacity>
      <MyJobs />
      <MyNotes />
      <Activity />
    </SafeAreaView>
  );
};

export default Profile;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  header: {
    backgroundColor: "#4A6CF7",
    alignItems: "center",
    padding: 20,
  },

  name: { color: "white", fontSize: 22 },
  email: { color: "white" },

  editBtn: {
    backgroundColor: "white",
    padding: 6,
    marginTop: 10,
    borderRadius: 5,
  },

  card: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },

  title: { fontSize: 18, marginBottom: 10 },

  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },

  skill: {
    padding: 5,
    backgroundColor: "#ddd",
    margin: 5,
    borderRadius: 5,
    flexDirection: "row",
  },

  addBtn: {
    marginTop: 10,
    backgroundColor: "#eee",
    padding: 10,
  },

  saveBtn: {
    backgroundColor: "#4CAF50",
    margin: 20,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalBox: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
  },
});
