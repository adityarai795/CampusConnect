import React, { useCallback, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const INITIAL_RESOURCES = [
  {
    id: 1,
    title: "JavaScript Documentation",
    type: "Documentation",
    icon: "📖",
    views: "2.4K",
  },
  {
    id: 2,
    title: "React Best Practices Guide",
    type: "Guide",
    icon: "📘",
    views: "1.8K",
  },
  {
    id: 3,
    title: "Web Dev Tutorial Series",
    type: "Video",
    icon: "🎥",
    views: "3.2K",
  },
  {
    id: 4,
    title: "CSS Flexbox Deep Dive",
    type: "Article",
    icon: "📝",
    views: "1.5K",
  },
];

const Resources = () => {
  const navigation = useNavigation();

  // ===== STATE =====
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // ===== HANDLERS =====
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleResourcePress = useCallback((id: number) => {
    console.log("Opening resource:", id);
  }, []);

  // ===== FILTERED RESOURCES =====
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch = resource.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || resource.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [resources, searchText, activeFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Resources</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearchChange}
          />
        </View>

        <View style={styles.filterTabs}>
          {["All", "Video", "Article"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                activeFilter === filter && styles.activeTab,
              ]}
              onPress={() => handleFilterChange(filter)}
            >
              <Text
                style={
                  activeFilter === filter
                    ? styles.activeTabText
                    : styles.filterTabText
                }
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Resources</Text>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <TouchableOpacity
                key={resource.id}
                style={styles.resourceCard}
                onPress={() => handleResourcePress(resource.id)}
              >
                <Text style={styles.resourceIcon}>{resource.icon}</Text>
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceTitle}>{resource.title}</Text>
                  <Text style={styles.resourceType}>{resource.type}</Text>
                </View>
                <View style={styles.viewsSection}>
                  <MaterialCommunityIcons name="eye" size={14} color="#999" />
                  <Text style={styles.views}>{resource.views}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No resources found</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#999",
    fontSize: 14,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: "#999",
    fontSize: 14,
  },
  filterTabs: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#F2F2F7",
  },
  activeTab: {
    backgroundColor: "#007AFF",
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  resourceIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  resourceType: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  viewsSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  views: {
    fontSize: 12,
    color: "#999",
  },
  noResultsText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
