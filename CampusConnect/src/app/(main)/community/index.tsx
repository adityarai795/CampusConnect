import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import api from "@/src/services/api";

const Community = () => {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchPosts = async () => {
    try {
      const response = await api.get("/community/post/viewall");
      console.log("Fetched posts:", response);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Community 123</Text>
          <Text style={styles.subtitle}>
            Connect and learn from fellow programmers
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={18} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search posts..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Create Post Button */}
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate("communityCreatePost")}
        >
          <MaterialCommunityIcons name="pencil-plus" size={18} color="#fff" />
          <Text style={styles.createPostText}>Create a Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.myPostsButton}
          onPress={() => navigation.navigate("communityMyPosts")}
        >
          <MaterialCommunityIcons name="account" size={18} color="#007AFF" />
          <Text style={styles.myPostsText}>View My Posts</Text>
        </TouchableOpacity>

        {/* Posts Section */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>
            {posts?.length > 0 ? "Recent Posts" : "No posts found"}
          </Text>
          <View>
            {posts.map((post: any) => (
              <TouchableOpacity
                key={post._id}
                style={styles.postCard}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate("communityPostDetails", {
                    postId: post._id,
                    post,
                  })
                }
              >
                <View style={styles.postHeader}>
                  <Text style={styles.avatar}>{post.avatar}</Text>
                  <View style={styles.authorSection}>
                    <Text style={styles.author}>{post.author}</Text>
                    <Text style={styles.postedTime}>{post.posted}</Text>
                  </View>
                </View>

                <View style={styles.postContent}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postDescription}>{post.description}</Text>

                  {/* Tags */}
                  <View style={styles.tagsContainer}>
                    {post?.tags?.map((tag: string) => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>#{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Post Footer */}
                <View style={styles.postFooter}>
                  <TouchableOpacity
                    style={styles.footerItem}
                    // onPress={() => handleLikePost(post.id)}
                  >
                    <MaterialCommunityIcons
                      name={post.liked ? "heart" : "heart-outline"}
                      size={16}
                      color={post.liked ? "#FF3B30" : "#999"}
                    />
                    <Text
                      style={[
                        styles.footerText,
                        post.liked && styles.likedText,
                      ]}
                    >
                      {post.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerItem}>
                    <MaterialCommunityIcons
                      name="comment-outline"
                      size={16}
                      color="#999"
                    />
                    <Text style={styles.footerText}>{post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerItem}>
                    <MaterialCommunityIcons
                      name="share-outline"
                      size={16}
                      color="#999"
                    />
                    <Text style={styles.footerText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}{" "}
          </View>
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
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterButton: {
    backgroundColor: "#F2F2F7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#007AFF",
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "600",
  },
  createPostButton: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  createPostText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  myPostsButton: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 8,
    borderColor: "#007AFF",
    borderWidth: 1,
    paddingVertical: 11,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F4F8FF",
  },
  myPostsText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  postsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: "#F9F9FB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderColor: "#E5E5EA",
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  authorSection: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  postedTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  postContent: {
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  postDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    backgroundColor: "#E5F3FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    color: "#007AFF",
    fontWeight: "500",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  likedText: {
    color: "#FF3B30",
  },
});
