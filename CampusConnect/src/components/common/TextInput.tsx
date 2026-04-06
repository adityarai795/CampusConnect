import React from "react";
import { View, Text, TextInput as RNTextInput, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  editable?: boolean;
  style?: any;
}

export const TextInput: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  keyboardType = "default",
  editable = true,
  style,
}) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: SPACING.lg,
    },
    label: {
      fontSize: FONT_SIZES.sm,
      fontWeight: "600",
      color: COLORS.text,
      marginBottom: SPACING.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: error ? COLORS.error : COLORS.gray300,
      borderRadius: BORDER_RADIUS.md,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.md,
      fontSize: FONT_SIZES.base,
      color: COLORS.text,
      backgroundColor: COLORS.gray100,
    },
    error: {
      fontSize: FONT_SIZES.xs,
      color: COLORS.error,
      marginTop: SPACING.sm,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, { height: multiline ? numberOfLines * 40 : 45 }]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
