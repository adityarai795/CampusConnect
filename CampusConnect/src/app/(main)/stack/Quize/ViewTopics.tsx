import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const topics = [
  "DSA",
  "Operating System",
  "DBMS",
  "Computer Networks",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Theory of Automata",
  "Compiler Design",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "AI/ML",
  "Other",
];

const ViewTopics = () => {
  const navigation = useNavigation<any>();


  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("openquize", { topic: item }) 
      }
      activeOpacity={0.8}
    >
      <View style={styles.icon}>
        <Text style={styles.iconText}>{item.charAt(0)}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.topicText}>{item}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 20 }}
      >
        <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.heading}>Select Quiz Topic</Text>
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={2} // grid layout
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ViewTopics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 15,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  iconText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  topicText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    color: "#444",
  },
});