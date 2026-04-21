import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";

const CreateResume = () => {
    const navigation = useNavigation<any>();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
  });

  const handleChange = (key:any, value:any) => {
    setForm({ ...form, [key]: value });
  };

  const generatePDF = async () => {
    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>${form.name}</h1>
          <p><b>Email:</b> ${form.email}</p>
          <p><b>Phone:</b> ${form.phone}</p>

          <h2>Skills</h2>
          <p>${form.skills}</p>

          <h2>Education</h2>
          <p>${form.education}</p>

          <h2>Experience</h2>
          <p>${form.experience}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(uri);
    } catch (err) {
      Alert.alert("Error", "Failed to generate resume");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Resume</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(t) => handleChange("name", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(t) => handleChange("email", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(t) => handleChange("phone", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Skills (comma separated)"
        onChangeText={(t) => handleChange("skills", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Education"
        onChangeText={(t) => handleChange("education", t)}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Experience"
        multiline
        onChangeText={(t) => handleChange("experience", t)}
      />

      <TouchableOpacity style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Download Resume</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateResume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f7fb",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
