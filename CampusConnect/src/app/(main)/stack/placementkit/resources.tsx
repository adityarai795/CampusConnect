import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Resources = () => {
  const navigation = useNavigation();

  const [resources, setResources] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleResourcePress = (link: string) => {
    Linking.openURL(link);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Youtube":
        return "youtube";
      case "Notes":
        return "file-document";
      case "Question Paper":
        return "file-question";
      case "Important Courses":
        return "school";
      default:
        return "file";
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch("http://13.203.2.23:3000/resource/showall");
      const data = await response.json();
      setResources(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch = r.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      if (activeFilter === "All") return matchesSearch;

      if (activeFilter === "Video")
        return matchesSearch && r.type === "Youtube";

      if (activeFilter === "Article")
        return matchesSearch && r.type !== "Youtube";

      return matchesSearch;
    });
  }, [resources, searchText, activeFilter]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
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
        {/* SEARCH */}
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

        {/* FILTER */}
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

        {/* RESOURCES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Resources</Text>

          {filteredResources.map((resource: any) => (
            <TouchableOpacity
              key={resource._id}
              style={styles.resourceCard}
              onPress={() => handleResourcePress(resource.link)}
            >
              <MaterialCommunityIcons
                name={getResourceIcon(resource.type)}
                size={28}
                color="#007AFF"
                style={{ marginRight: 12 }}
              />

              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceType}>
                  {resource.type} • Sem {resource.semester}
                </Text>
              </View>

              <MaterialCommunityIcons
                name="open-in-new"
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          ))}
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
    color: "#000",
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
});
