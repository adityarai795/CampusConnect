import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

const [request, response, promptAsync] = Google.useAuthRequest({
  clientId: "YOUR_WEB_CLIENT_ID",
  androidClientId: "YOUR_ANDROID_CLIENT_ID",
  iosClientId: "YOUR_IOS_CLIENT_ID",
});

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      Alert.alert("Google Login Success");
      router.push("/(main)");
    }
  }, [response]);

  const handleLinkedInLogin = () => {
    Alert.alert(
      "LinkedIn Login",
      "LinkedIn OAuth should be handled via backend redirect"
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="school" size={48} color="#007AFF" />
        <Text style={styles.title}>CampusConnect</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Normal Login */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            Alert.alert("Login Successful", `Welcome back, ${email}!`);
            router.push("/(main)");
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Google Login */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
        >
          <MaterialCommunityIcons name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* LinkedIn Login */}
        <TouchableOpacity
          style={styles.linkedinButton}
          onPress={handleLinkedInLogin}
        >
          <MaterialCommunityIcons name="linkedin" size={20} color="#fff" />
          <Text style={styles.linkedinText}>Continue with LinkedIn</Text>
        </TouchableOpacity>

        {/* Signup */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: { alignItems: "center", marginBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#000", marginTop: 12 },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4 },
  form: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#000", marginBottom: 8 },
  input: {
    borderColor: "#E5E5EA",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { fontSize: 14, color: "#666" },
  signupLink: { fontSize: 14, color: "#007AFF", fontWeight: "600" },
  divider: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 20,
},

line: {
  flex: 1,
  height: 1,
  backgroundColor: "#E5E5EA",
},

dividerText: {
  marginHorizontal: 10,
  color: "#666",
},

googleButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "#E5E5EA",
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
  gap: 10,
},

linkedinButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#0A66C2",
  padding: 12,
  borderRadius: 8,
  gap: 10,
},

socialText: {
  fontSize: 14,
  fontWeight: "500",
},

linkedinText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "600",
},
});