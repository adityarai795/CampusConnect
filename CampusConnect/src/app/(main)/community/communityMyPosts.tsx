import React, { useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/src/services/api";



const CommunityMyPosts = () => {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = React.useState<any[]>([]);
  const fetchMyPosts = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("/community/post/myposts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPosts(response.data.posts);
  };
  useEffect(() => {
    fetchMyPosts();;
  },[posts.length]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>My Posts</Text>
        <View style={styles.spacer} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("communityPostDetails", {
                postId: item._id,
                post: item,
              })
            }
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.likes} likes</Text>
              <Text style={styles.metaText}>{item.comments} comments</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => navigation.navigate("communityCreatePost")}
          >
            <MaterialCommunityIcons name="plus" size={18} color="#fff" />
            <Text style={styles.createBtnText}>Create New Post</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default CommunityMyPosts;

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
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    padding: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardDesc: {
    marginTop: 6,
    color: "#334155",
    fontSize: 13,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
  },
  metaText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  createBtn: {
    marginTop: 4,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
