import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  size = "md",
  style,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.gray300;
    switch (variant) {
      case "primary":
        return COLORS.primary;
      case "secondary":
        return COLORS.secondary;
      case "danger":
        return COLORS.error;
      case "outline":
        return "transparent";
      default:
        return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (variant === "outline") return COLORS.primary;
    return "#FFFFFF";
  };

  const getPadding = () => {
    switch (size) {
      case "sm":
        return SPACING.md;
      case "lg":
        return SPACING.xl;
      default:
        return SPACING.lg;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return FONT_SIZES.sm;
      case "lg":
        return FONT_SIZES.lg;
      default:
        return FONT_SIZES.base;
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      borderWidth: variant === "outline" ? 2 : 0,
      borderColor: variant === "outline" ? COLORS.primary : undefined,
      paddingVertical: getPadding(),
      paddingHorizontal: SPACING.xl,
      borderRadius: BORDER_RADIUS.md,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: getTextColor(),
      fontSize: getFontSize(),
      fontWeight: "600",
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{loading ? "Loading..." : title}</Text>
    </TouchableOpacity>
  );
};
