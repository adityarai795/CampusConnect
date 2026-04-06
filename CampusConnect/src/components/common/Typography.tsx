import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../../constants";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "small";
  color?: string;
  weight?: "400" | "500" | "600" | "700";
  style?: any;
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  color = COLORS.text,
  weight = "400",
  style,
  numberOfLines,
}) => {
  const getFontSize = () => {
    switch (variant) {
      case "h1":
        return FONT_SIZES["4xl"];
      case "h2":
        return FONT_SIZES["3xl"];
      case "h3":
        return FONT_SIZES["2xl"];
      case "h4":
        return FONT_SIZES.xl;
      case "body":
        return FONT_SIZES.base;
      case "caption":
        return FONT_SIZES.sm;
      case "small":
        return FONT_SIZES.xs;
      default:
        return FONT_SIZES.base;
    }
  };

  const getLineHeight = () => {
    switch (variant) {
      case "h1":
        return 40;
      case "h2":
        return 36;
      case "h3":
        return 32;
      case "h4":
        return 28;
      case "body":
        return 24;
      case "caption":
        return 20;
      case "small":
        return 16;
      default:
        return 24;
    }
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: getFontSize(),
      lineHeight: getLineHeight(),
      fontWeight: weight as any,
      color: color,
    },
  });

  return (
    <Text style={[styles.text, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
