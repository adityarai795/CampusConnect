import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Aditya Rai",
    email: "aditya@gmail.com",
    mobileno: "9839930768",
    skills: ["React", "Node.js", "MongoDB"],
    linkedin: "",
    github: "",
    leetcode: "",
  });

  const handleChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };

  return (
    <ScrollView style={styles.container}>
      {/* 🔥 HEADER (WEB STYLE) */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-circle" size={90} color="#fff" />
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.email}>{profileData.email}</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={{ color: "#4A6CF7" }}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 BASIC INFO */}
      <View style={styles.card}>
        <Text style={styles.title}>Basic Info</Text>

        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={profileData.name}
          editable={isEditing}
          onChangeText={(t) => handleChange("name", t)}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={profileData.email}
          editable={false}
        />

        <Text>Phone</Text>
        <TextInput
          style={styles.input}
          value={profileData.mobileno}
          editable={isEditing}
          onChangeText={(t) => handleChange("mobileno", t)}
        />
      </View>

      {/* 🔥 SKILLS */}
      <View style={styles.card}>
        <Text style={styles.title}>Skills</Text>

        <View style={styles.skillContainer}>
          {profileData.skills.map((skill, i) => (
            <View key={i} style={styles.skill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 🔥 SOCIAL LINKS */}
      <View style={styles.card}>
        <Text style={styles.title}>Social Links</Text>

        <TextInput
          style={styles.input}
          placeholder="LinkedIn"
          editable={isEditing}
          value={profileData.linkedin}
          onChangeText={(t) => handleChange("linkedin", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="GitHub"
          editable={isEditing}
          value={profileData.github}
          onChangeText={(t) => handleChange("github", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="LeetCode"
          editable={isEditing}
          value={profileData.leetcode}
          onChangeText={(t) => handleChange("leetcode", t)}
        />
      </View>

      {/* 🔥 SAVE BUTTON */}
      {isEditing && (
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Save Changes
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#4A6CF7",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  email: {
    color: "#eee",
    marginTop: 4,
  },

  editBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 16,
    borderRadius: 15,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skill: {
    backgroundColor: "#E8ECFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    margin: 4,
  },

  skillText: {
    color: "#4A6CF7",
  },

  saveBtn: {
    backgroundColor: "#4A6CF7",
    margin: 20,
    padding: 15,
    alignItems: "center",
    borderRadius: 12,
  },
});