import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommunityCreatePost = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [college, setCollege] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Validation", "Title and description are required.");
      return;
    }
    const token = await AsyncStorage.getItem("token");
    const response = await api.post(
      "/community/post/addPost",
      {
        title,
        description,
        college,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    Alert.alert("Post Created", "Your post has been added to community.");
    navigation.navigate("community");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Post</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Post Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Write a title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your post"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>College</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your college"
          value={college}
          onChangeText={setCollege}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <MaterialCommunityIcons name="check" size={18} color="#fff" />
          <Text style={styles.submitText}>Publish Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityCreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 4,
  },
  spacer: {
    width: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  label: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  textArea: {
    minHeight: 130,
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
