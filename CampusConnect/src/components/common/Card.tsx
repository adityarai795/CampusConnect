import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants";

interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: COLORS.background,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.md,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
  });

  return (
    <View style={[styles.card, style]} onTouchEnd={onPress}>
      {children}
    </View>
  );
};

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  size = "md",
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return COLORS.primary;
      case "secondary":
        return COLORS.secondary;
      case "success":
        return COLORS.success;
      case "warning":
        return COLORS.warning;
      case "error":
        return COLORS.error;
      default:
        return COLORS.primary;
    }
  };

  const getPadding = size === "sm" ? SPACING.sm : SPACING.md;
  const fontSize = size === "sm" ? FONT_SIZES.xs : FONT_SIZES.sm;

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: getBackgroundColor(),
      paddingHorizontal: getPadding,
      paddingVertical: SPACING.sm,
      borderRadius: BORDER_RADIUS.full,
      alignSelf: "flex-start",
    },
    text: {
      color: "#FFFFFF",
      fontSize: fontSize,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};
