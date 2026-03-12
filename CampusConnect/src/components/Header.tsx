import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      {/* Left section - Menu button */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}
      >
        <MaterialCommunityIcons name="menu" size={24} color="#000" />
      </TouchableOpacity>

      {/* Middle section - User info */}
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons
            name="account-circle"
            size={32}
            color="#007AFF"
          />
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.name}>Aditya Rai</Text>
          <Text style={styles.email}>john@example.com</Text>
        </View>
      </View>

      {/* Right section - Notifications */}
      <TouchableOpacity style={styles.notificationButton}>
        <MaterialCommunityIcons name="bell" size={24} color="#000" />
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
  },
  menuButton: {
    padding: 8,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  avatar: {
    marginRight: 8,
  },
  textInfo: {
    justifyContent: "center",
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  email: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
  notificationButton: {
    padding: 8,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
