import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, TextInput, Typography } from "../common";
import { useForm } from "../../hooks/useAsync";
import { SPACING, COLORS } from "../../constants";
import { validateEmail, validatePassword } from "../../utils/validation";

interface SignupFormProps {
  onSignupSuccess?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, setFieldError } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    async (values) => {
      try {
        setLoading(true);

        // Validation
        if (!values.firstName.trim()) {
          setFieldError("firstName", "First name is required");
          return;
        }
        if (!values.lastName.trim()) {
          setFieldError("lastName", "Last name is required");
          return;
        }
        if (!validateEmail(values.email)) {
          setFieldError("email", "Invalid email format");
          return;
        }

        const passwordValidation = validatePassword(values.password);
        if (!passwordValidation.valid) {
          setFieldError("password", passwordValidation.errors[0]);
          return;
        }

        if (values.password !== values.confirmPassword) {
          setFieldError("confirmPassword", "Passwords do not match");
          return;
        }

        // Mock API call
        // const response = await signupAPI(values);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        Alert.alert("Success", "Account created successfully!");
        onSignupSuccess?.();
        router.replace("/(main)");
      } catch (error: any) {
        Alert.alert("Error", error.message || "Signup failed");
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: SPACING.md,
    },
    halfInput: {
      flex: 1,
    },
    footer: {
      marginTop: SPACING.lg,
      alignItems: "center",
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Typography variant="h2" weight="700">
          Create Account
        </Typography>
        <Typography
          variant="body"
          color={COLORS.textSecondary}
          style={{ marginTop: SPACING.sm }}
        >
          Join our community of learners
        </Typography>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            label="First Name"
            placeholder="John"
            value={values.firstName}
            onChangeText={(text) =>
              handleChange({ target: { name: "firstName", value: text } })
            }
            error={errors.firstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            value={values.lastName}
            onChangeText={(text) =>
              handleChange({ target: { name: "lastName", value: text } })
            }
            error={errors.lastName}
          />
        </View>

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

        <TextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChangeText={(text) =>
            handleChange({ target: { name: "confirmPassword", value: text } })
          }
          error={errors.confirmPassword}
          secureTextEntry
        />

        <Button
          title={loading ? "Creating account..." : "Create Account"}
          onPress={() => {}}
          disabled={loading}
          loading={loading}
        />
      </View>

      <View style={styles.footer}>
        <Typography variant="body" color={COLORS.textSecondary}>
          Already have an account?{" "}
          <Typography
            variant="body"
            weight="600"
            color={COLORS.primary}
            onPress={() => router.push("/(auth)/login")}
          >
            Sign in
          </Typography>
        </Typography>
      </View>
    </ScrollView>
  );
};
