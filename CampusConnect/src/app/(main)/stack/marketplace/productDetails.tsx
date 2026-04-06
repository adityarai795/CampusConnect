import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const product = route.params?.product;
  const productId = route.params?.productId;

  const imageUri = useMemo(() => {
    const uri = product?.imageUrl || product?.image || product?.thumbnail;
    return typeof uri === "string" && uri.length > 0
      ? uri
      : "https://placehold.co/400x300";
  }, [product]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Text style={styles.title}>{product?.title || "Untitled Product"}</Text>
        <Text style={styles.price}>₹{product?.price ?? "N/A"}</Text>

        <View style={styles.card}>
          <Text style={styles.metaLabel}>Product ID</Text>
          <Text style={styles.metaValue}>{productId || "Not provided"}</Text>

          <Text style={styles.metaLabel}>Location</Text>
          <Text style={styles.metaValue}>{product?.location || "N/A"}</Text>

          <Text style={styles.metaLabel}>Description</Text>
          <Text style={styles.description}>
            {product?.description ||
              "No description available for this product yet."}
          </Text>
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Contact Seller</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: "#F2F2F7",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16A34A",
    marginTop: 6,
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginTop: 10,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#334155",
    marginTop: 6,
    lineHeight: 20,
  },
  ctaButton: {
    marginTop: 18,
    backgroundColor: "#0EA5E9",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
