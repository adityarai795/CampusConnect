import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, SPACING } from "../../constants";

interface LoadingProps {
  size?: "small" | "large";
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "large",
  color = COLORS.primary,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: SPACING.xl,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
