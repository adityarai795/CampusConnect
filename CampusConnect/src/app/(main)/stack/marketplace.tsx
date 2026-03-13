import React, { useCallback, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Premium Course Bundle",
    price: "$99.99",
    icon: "📚",
    rating: 4.8,
    inCart: false,
  },
  {
    id: 2,
    name: "Mock Interview Session",
    price: "$49.99",
    icon: "🎤",
    rating: 4.9,
    inCart: false,
  },
  {
    id: 3,
    name: "Career Mentorship",
    price: "$199.99",
    icon: "👨‍🏫",
    rating: 4.7,
    inCart: false,
  },
];

const MarketPlace = () => {
  const navigation = useNavigation();

  // ===== STATE =====
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // ===== HANDLERS =====
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleAddToCart = useCallback((id: number) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          setCartCount((count) => count + (product.inCart ? -1 : 1));
          return { ...product, inCart: !product.inCart };
        }
        return product;
      }),
    );
  }, []);

  // ===== FILTERED PRODUCTS =====
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [products, searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Text style={styles.productIcon}>{product.icon}</Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons
                      name="star"
                      size={14}
                      color="#FFB800"
                    />
                    <Text style={styles.rating}>{product.rating}</Text>
                  </View>
                </View>
                <View style={styles.priceSection}>
                  <Text style={styles.price}>{product.price}</Text>
                  <TouchableOpacity
                    style={[
                      styles.addButton,
                      product.inCart && styles.addButtonActive,
                    ]}
                    onPress={() => handleAddToCart(product.id)}
                  >
                    <MaterialCommunityIcons
                      name={product.inCart ? "check" : "plus"}
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
    color: "#999",
    fontSize: 14,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: "#999",
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
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  productIcon: {
    fontSize: 28,
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
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
  addButtonActive: {
    backgroundColor: "#34C759",
  },
  noResultsText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
