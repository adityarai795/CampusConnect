import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "@/src/services/api";

const MarketPlace = () => {
  const navigation = useNavigation<any>();

  const [products, setProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  // ===== FETCH PRODUCTS =====
  const fetchData = async () => {
    try {
      // const response = await fetch(
      //   "http://api.collegeconnect.me/marketplace/ShowAllProducts",
      // );
      const response = await api.get("/marketplace/ShowAllProducts");
      console.log("API Response:", response);
      // Handle both possible responses
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===== FILTER PRODUCTS =====
  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Market Place</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== SEARCH ===== */}
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearchChange}
          />
        </View>

        {/* ===== PRODUCTS ===== */}
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity
              style={[
                styles.addButton,
                { position: "absolute", right: 0, top: -5 },
              ]}
              onPress={() => navigation.navigate("marketplaceUploadProduct")}
            >
              {" "}
              <MaterialCommunityIcons name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <TouchableOpacity
                key={product._id}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("productDetails", {
                    productId: product._id,
                    product,
                  })
                }
              >
                <View key={product._id} style={styles.productCard}>
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.productImage}
                  />

                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.title}</Text>

                    <Text style={styles.location}>📍 {product.location}</Text>
                  </View>

                  <View style={styles.priceSection}>
                    <Text style={styles.price}>₹{product.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No products found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MarketPlace;

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
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
    fontSize: 14,
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

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  productImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
    marginRight: 12,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  location: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
  },

  priceSection: {
    alignItems: "flex-end",
  },

  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34C759",
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: "#007AFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  noResultsText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
