import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const ApplyAmbassador = () => {
    const navigation = useNavigation<any>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    institutionName: "",
    course: "",
    branch: "",
    year: "",
    graduationYear: "",
    weeklyAvailabilityHours: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    motivation: "",
  });

  const handleChange = (key:any, value:any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Ambassador Application</Text>
      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Aditya Rai"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      {/* Email + Phone */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>Mobile *</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            keyboardType="phone-pad"
            value={formData.mobileNumber}
            onChangeText={(text) => handleChange("mobileNumber", text)}
          />
        </View>
      </View>

      {/* Academic */}
      <Text style={styles.section}>Academic Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Institution Name"
        value={formData.institutionName}
        onChangeText={(text) => handleChange("institutionName", text)}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Course"
          value={formData.course}
          onChangeText={(text) => handleChange("course", text)}
        />
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Branch"
          value={formData.branch}
          onChangeText={(text) => handleChange("branch", text)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Year"
        value={formData.year}
        onChangeText={(text) => handleChange("year", text)}
      />

      {/* Graduation + Availability */}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Graduation Year"
          keyboardType="numeric"
          value={formData.graduationYear}
          onChangeText={(text) => handleChange("graduationYear", text)}
        />
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Weekly Hours"
          keyboardType="numeric"
          value={formData.weeklyAvailabilityHours}
          onChangeText={(text) => handleChange("weeklyAvailabilityHours", text)}
        />
      </View>

      {/* Social */}
      <Text style={styles.section}>Social Media</Text>

      <TextInput
        style={styles.input}
        placeholder="LinkedIn"
        value={formData.linkedin}
        onChangeText={(text) => handleChange("linkedin", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram"
        value={formData.instagram}
        onChangeText={(text) => handleChange("instagram", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Twitter"
        value={formData.twitter}
        onChangeText={(text) => handleChange("twitter", text)}
      />

      {/* Motivation */}
      <Text style={styles.label}>Motivation *</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Why do you want to become ambassador..."
        multiline
        numberOfLines={4}
        value={formData.motivation}
        onChangeText={(text) => handleChange("motivation", text)}
      />

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ApplyAmbassador;

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 10,
  },

  backText: {
    fontSize: 16,
    color: "#4f46e5",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
