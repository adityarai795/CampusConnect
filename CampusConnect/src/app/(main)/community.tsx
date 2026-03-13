import React, { useState, useCallback } from "react";
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
import Header from "../../components/Header";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Aditya Rai",
      avatar: "👨‍💻",
      title: "Tips for learning React",
      description:
        "Share your best practices and tips for learning React framework effectively",
      likes: 124,
      comments: 32,
      liked: false,
      posted: "2h ago",
      tags: ["React", "Tips"],
    },
    {
      id: 2,
      author: "Guddu Kumar",
      avatar: "👩‍💻",
      title: "Web Development Best Practices",
      description:
        "Discuss best practices in modern web development and clean code",
      likes: 87,
      comments: 19,
      liked: false,
      posted: "4h ago",
      tags: ["WebDev", "Best Practices"],
    },
    {
      id: 3,
      author: "Priya Singh",
      avatar: "👩‍💻",
      title: "JavaScript Interview Tips",
      description: "Share your favorite JS interview questions and answers",
      likes: 156,
      comments: 45,
      liked: false,
      posted: "6h ago",
      tags: ["JavaScript", "Interviews"],
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleLikePost = useCallback((postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      }),
    );
  }, []);

  const handleCreatePost = useCallback(() => {
    Alert.alert("Create Post", "Write your question or share your thoughts", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Post",
        onPress: () => {
          Alert.alert("Success", "Your post has been created!");
        },
      },
    ]);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(activeFilter.toLowerCase()),
      );
    return matchesSearch && matchesFilter;
  });

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

        {/* Filter Tabs */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["All", "React", "Tips", "WebDev", "JavaScript"].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.activeFilterButton,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activeFilter === filter && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Create Post Button */}
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={handleCreatePost}
        >
          <MaterialCommunityIcons name="pencil-plus" size={18} color="#fff" />
          <Text style={styles.createPostText}>Create a Post</Text>
        </TouchableOpacity>

        {/* Posts Section */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>
            {filteredPosts.length > 0 ? "Recent Posts" : "No posts found"}
          </Text>
          {filteredPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
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
                  {post.tags.map((tag) => (
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
                  onPress={() => handleLikePost(post.id)}
                >
                  <MaterialCommunityIcons
                    name={post.liked ? "heart" : "heart-outline"}
                    size={16}
                    color={post.liked ? "#FF3B30" : "#999"}
                  />
                  <Text
                    style={[styles.footerText, post.liked && styles.likedText]}
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
