import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "@/src/services/api";

type ResultItem = {
  _id: string;
  testName?: string;
  date?: string;
  category?: string;
  score?: number;
};

const Result = () => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Quiz", "Challenge", "Project"];

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/result/showall");
      const data = Array.isArray(response?.data?.showall)
        ? response.data.showall
        : [];

      setResults(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const filteredResults = results.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const renderResult = ({ item }: any) => {
    return (
      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>
            {item.University || "Untitled Test"}
          </Text>
        </View>

        <View style={styles.resultMeta}>
          <Text style={styles.resultDate}>
            {item.link}
          </Text>

          <Text style={styles.resultCategory}>
            {item.category || "General"}
          </Text>
        </View>

        {item.score && (
          <View style={styles.scoreSection}>
            <Text style={styles.score}>{item.score}</Text>
            <Text style={styles.maxScore}>/100</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item._id}
        renderItem={renderResult}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <>
            <View style={styles.headerSection}>
              <Text style={styles.title}>Test Results</Text>
              <Text style={styles.subtitle}>
                Track your assessment progress
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerSection: {
    padding: 20,
    backgroundColor: "#F2F2F7",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },

  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  categoryButton: {
    backgroundColor: "#F2F2F7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },

  activeCategoryButton: {
    backgroundColor: "#007AFF",
  },

  categoryButtonText: {
    fontSize: 12,
    color: "#666",
  },

  activeCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },

  resultCard: {
    backgroundColor: "#F9F9FB",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },

  resultHeader: {
    marginBottom: 8,
  },

  resultTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  resultMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  resultDate: {
    fontSize: 12,
    color: "#999",
  },

  resultCategory: {
    fontSize: 11,
    color: "#007AFF",
    backgroundColor: "#E5F3FF",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  scoreSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  score: {
    fontSize: 20,
    fontWeight: "bold",
  },

  maxScore: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
  },

  emptyText: {
    color: "#999",
  },
});
