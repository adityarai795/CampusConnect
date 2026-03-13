import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const Community = () => {
  const communityPosts = [
    {
      id: 1,
      author: "Aditya rai",
      avatar: "👨‍💻",
      title: "Tips for learning React",
      description:
        "Share your best practices and tips for learning React framework",
      likes: 124,
      comments: 32,
    },
    {
      id: 2,
      author: "Guddu kumar",
      avatar: "👩‍💻",
      title: "Web Development Best Practices",
      description: "Discuss best practices in modern web development",
      likes: 87,
      comments: 19,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.subtitle}>
            Connect and learn from fellow programmers
          </Text>
        </View>

        <TouchableOpacity style={styles.createPostButton}>
          <MaterialCommunityIcons name="plus" size={20} color="#fff" />
          <Text style={styles.createPostText}>Create a Post</Text>
        </TouchableOpacity>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {communityPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Text style={styles.avatar}>{post.avatar}</Text>
                <View>
                  <Text style={styles.author}>{post.author}</Text>
                  <Text style={styles.postTitle}>{post.title}</Text>
                </View>
              </View>
              <Text style={styles.postDescription}>{post.description}</Text>
              <View style={styles.postFooter}>
                <TouchableOpacity style={styles.footerItem}>
                  <MaterialCommunityIcons
                    name="heart"
                    size={16}
                    color="#FF3B30"
                  />
                  <Text style={styles.footerText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                  <MaterialCommunityIcons
                    name="comment"
                    size={16}
                    color="#007AFF"
                  />
                  <Text style={styles.footerText}>{post.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerSection: {
    padding: 20,
    backgroundColor: "#F2F2F7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  createPostButton: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  createPostText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
  postsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    fontSize: 24,
    marginRight: 12,
  },
  author: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
  },
  postDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
    paddingTop: 12,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
});
