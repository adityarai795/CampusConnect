import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import {
  Card,
  Typography,
  Button,
  TextInput,
} from "../../../../components/common";
import { SPACING, COLORS } from "../../../../constants";

const mockMarketplace = [
  {
    id: "1",
    name: "DSA Interview Notes",
    seller: "Study Group",
    price: 299,
    rating: 4.8,
    reviews: 125,
  },
  {
    id: "2",
    name: "Web Development Bundle",
    seller: "CourseHub",
    price: 599,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    name: "System Design Guide",
    seller: "Tech Expert",
    price: 399,
    rating: 4.9,
    reviews: 156,
  },
];

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      backgroundColor: COLORS.accent,
      padding: SPACING.lg,
      paddingTop: SPACING["2xl"],
    },
    headerTitle: {
      color: "#FFFFFF",
      marginBottom: SPACING.md,
    },
    searchBar: {
      marginBottom: 0,
    },
    content: {
      padding: SPACING.lg,
    },
    productCard: {
      marginBottom: SPACING.md,
    },
    productName: {
      marginBottom: SPACING.sm,
    },
    seller: {
      color: COLORS.textSecondary,
      marginBottom: SPACING.md,
    },
    productFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: SPACING.md,
      borderTopWidth: 1,
      borderTopColor: COLORS.gray200,
    },
    price: {
      color: COLORS.success,
      fontWeight: "700",
    },
    rating: {
      color: COLORS.accent,
    },
  });

  const renderProduct = ({ item }: any) => (
    <Card style={styles.productCard}>
      <Typography variant="h4" weight="600" style={styles.productName}>
        {item.name}
      </Typography>
      <Typography style={styles.seller}>Seller: {item.seller}</Typography>

      <View style={styles.productFooter}>
        <Typography style={styles.price}>₹{item.price}</Typography>
        <Typography style={styles.rating}>
          ⭐ {item.rating} ({item.reviews})
        </Typography>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" weight="700" style={styles.headerTitle}>
          CampusMarket
        </Typography>
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ marginBottom: 0 }}
        />
      </View>

      <FlatList
        data={mockMarketplace}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        scrollEnabled
      />
    </View>
  );
}
