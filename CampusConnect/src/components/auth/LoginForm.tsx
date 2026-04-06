import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Button, TextInput, Typography, Loading } from "../common";
import { useForm } from "../../hooks/useAsync";
import { SPACING, COLORS } from "../../constants";
import { validateEmail } from "../../utils/validation";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, handleSubmit, setFieldError } = useForm(
    {
      email: "",
      password: "",
    },
    async (values) => {
      try {
        setLoading(true);

        // Validation
        if (!validateEmail(values.email)) {
          setFieldError("email", "Invalid email format");
          return;
        }
        if (values.password.length < 6) {
          setFieldError("password", "Password must be at least 6 characters");
          return;
        }

        // Mock API call
        // const response = await loginAPI(values.email, values.password);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        Alert.alert("Success", "Login successful!");
        onLoginSuccess?.();
        router.replace("/(main)");
      } catch (error: any) {
        Alert.alert("Error", error.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: SPACING.lg,
    },
    header: {
      marginBottom: SPACING["2xl"],
    },
    form: {
      marginBottom: SPACING.xl,
    },
    footer: {
      marginTop: SPACING.lg,
      alignItems: "center",
    },
    link: {
      color: COLORS.primary,
      fontWeight: "600",
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Typography variant="h2" weight="700">
          Welcome Back
        </Typography>
        <Typography
          variant="body"
          color={COLORS.textSecondary}
          style={{ marginTop: SPACING.sm }}
        >
          Sign in to continue to your account
        </Typography>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={values.email}
          onChangeText={(text) =>
            handleChange({ target: { name: "email", value: text } })
          }
          error={errors.email}
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={values.password}
          onChangeText={(text) =>
            handleChange({ target: { name: "password", value: text } })
          }
          error={errors.password}
          secureTextEntry
        />

        <Button
          title={loading ? "Signing in..." : "Sign in"}
          onPress={() => handleSubmit({ preventDefault: () => {} })}
          disabled={loading}
          loading={loading}
        />
      </View>

      <View style={styles.footer}>
        <Typography variant="body" color={COLORS.textSecondary}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Typography variant="body" weight="600" color={COLORS.primary}>
              Sign up
            </Typography>
          </TouchableOpacity>
        </Typography>
      </View>
    </ScrollView>
  );
};
