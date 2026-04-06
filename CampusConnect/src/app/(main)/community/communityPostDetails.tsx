import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CommunityPostDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const post = route.params?.post;
  const postId = route.params?.postId;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Post Details</Text>
        <View style={styles.iconSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.postTitle}>{post?.title || "Untitled Post"}</Text>
        <Text style={styles.postMeta}>
          Post ID: {postId || "Not available"}
        </Text>
        <Text style={styles.postMeta}>Author: {post?.author || "Unknown"}</Text>

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>
          {post?.description || "No description available for this post."}
        </Text>

        <Text style={styles.sectionLabel}>Tags</Text>
        <View style={styles.tagsWrap}>
          {(post?.tags || []).length > 0 ? (
            post.tags.map((tag: string) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noData}>No tags</Text>
          )}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={18}
              color="#EF4444"
            />
            <Text style={styles.statText}>{post?.likes ?? 0} likes</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={18}
              color="#3B82F6"
            />
            <Text style={styles.statText}>{post?.comments ?? 0} comments</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityPostDetails;

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
  iconButton: {
    padding: 4,
  },
  iconSpacer: {
    width: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    padding: 16,
  },
  postTitle: {
    fontSize: 22,
    color: "#0F172A",
    fontWeight: "700",
  },
  postMeta: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 13,
  },
  sectionLabel: {
    marginTop: 18,
    fontSize: 12,
    color: "#64748B",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  description: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#334155",
  },
  tagsWrap: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: "#0369A1",
    fontWeight: "600",
    fontSize: 12,
  },
  noData: {
    color: "#94A3B8",
    fontSize: 13,
  },
  statsRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    gap: 6,
  },
  statText: {
    color: "#334155",
    fontWeight: "600",
  },
});
