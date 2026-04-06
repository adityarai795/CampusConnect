import React from "react";
import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { COLORS } from "../../../constants";

const headerOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTintColor: "#FFFFFF",
  headerTitleStyle: {
    fontWeight: "600" as const,
  },
};

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        ...headerOptions,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="placementkit/coding"
        options={{ title: "Coding Problems" }}
      />
      <Stack.Screen
        name="placementkit/progress"
        options={{ title: "Progress" }}
      />
      <Stack.Screen
        name="placementkit/project"
        options={{ title: "Projects" }}
      />
      <Stack.Screen name="placementkit/quiz" options={{ title: "Quizzes" }} />

      <Stack.Screen name="job/jobs-list" options={{ title: "Jobs" }} />
      <Stack.Screen name="job/job-details" options={{ title: "Job Details" }} />

      <Stack.Screen name="marketplace" options={{ title: "Marketplace" }} />
      <Stack.Screen
        name="marketplace/marketplaceUploadProduct"
        options={{ title: "Upload Product" }}
      />

      <Stack.Screen name="profile" options={{ title: "Profile" }} />

      <Stack.Screen name="resources" options={{ title: "Resources" }} />

      <Stack.Screen name="roadmap" options={{ title: "Roadmap" }} />

      <Stack.Screen
        name="resume/resume"
        options={{ title: "Resume Builder" }}
      />
      <Stack.Screen name="resume/checkats" options={{ title: "Resume Chat" }} />

      <Stack.Screen
        name="ambassador/ambassador"
        options={{ title: "Ambassador" }}
      />
      <Stack.Screen
        name="ambassador/applyAmbassador"
        options={{ title: "Apply as Ambassador" }}
      />

      <Stack.Screen name="supports" options={{ title: "Support" }} />
    </Stack>
  );
}
