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

const MarketplaceUploadProduct = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = () => {
    if (!title.trim() || !price.trim()) {
      Alert.alert("Validation", "Product title and price are required.");
      return;
    }

    Alert.alert("Uploaded", "Your product has been submitted.");
    navigation.goBack();
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
        <Text style={styles.title}>Upload Product</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Product Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Used laptop, keyboard, etc."
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Price (INR)</Text>
        <TextInput
          style={styles.input}
          placeholder="2500"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Delhi"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add details about condition and usage"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleUpload}>
          <MaterialCommunityIcons name="cloud-upload" size={18} color="#fff" />
          <Text style={styles.submitText}>Submit Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MarketplaceUploadProduct;

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
    backgroundColor: "#0EA5E9",
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
