# CampusConnect Setup & Development Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Environment Setup](#environment-setup)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [Available Scripts](#available-scripts)
7. [API Integration](#api-integration)
8. [Component Usage](#component-usage)
9. [Best Practices](#best-practices)

## 🎯 Project Overview

**CampusConnect** is a comprehensive mobile application built with React Native and Expo that helps students with:

- Competitive programming & DSA preparation
- Job hunting and placement assistance
- Community interaction and knowledge sharing
- Learning resource management
- Marketplace for educational materials

**Tech Stack:**

- React Native 0.81.5
- Expo 54.0.33
- Expo Router 6.0.23
- TypeScript 5.9.2
- Axios for API calls

## 🚀 Installation

### Prerequisites

- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Mobile device or emulator

### Steps

```bash
# 1. Navigate to project directory
cd CampusConnect

# 2. Install dependencies
npm install
# or
yarn install

# 3. Install missing peer dependencies if any
npm install --save-dev @types/react@~19.1.0

# 4. Start the app
npm start
# or
expo start
```

## 🔧 Environment Setup

### 1. Create `.env` file in root directory

```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_APP_ENV=development
```

### 2. Update API Configuration

Edit `src/constants/index.ts`:

```typescript
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";
```

### 3. Configure for Different Platforms

#### For Android:

```bash
npm run android
```

#### For iOS:

```bash
npm run ios
```

#### For Web:

```bash
npm run web
```

## 📁 Project Structure Summary

```
CampusConnect/
├── src/
│   ├── app/                    # Expo Router screens
│   │   ├── (auth)/            # Authentication
│   │   └── (main)/            # Main app
│   ├── components/            # Reusable components
│   ├── services/              # API service
│   ├── context/               # State management
│   ├── hooks/                 # Custom hooks
│   ├── utils/                 # Helper functions
│   ├── types/                 # TypeScript types
│   ├── constants/             # App constants
│   └── index.ts               # Main exports
├── package.json
├── app.json                   # Expo config
└── tsconfig.json             # TypeScript config
```

## 💻 Development Workflow

### 1. Creating a New Screen

**Step 1:** Create route file in `src/app/(main)/...`

```typescript
// src/app/(main)/stack/new-feature/index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, Button } from '../../../components/common';
import { COLORS, SPACING } from '../../../constants';

export default function NewFeatureScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      padding: SPACING.lg,
    },
  });

  return (
    <View style={styles.container}>
      <Typography variant="h3">New Feature</Typography>
    </View>
  );
}
```

**Step 2:** Create component if needed in `src/components/...`

### 2. Creating an API Call

**Step 1:** Add method to `src/services/api-service.ts`

```typescript
async getFeatureData(id: string) {
  return this.api.get(`/feature/${id}`);
}
```

**Step 2:** Use in component

```typescript
import apiService from "../../../services/api-service";
import { useAsync } from "../../../hooks";

const { data, loading, error, execute } = useAsync(
  () => apiService.getFeatureData("123"),
  true, // auto-fetch on mount
);
```

### 3. Form Handling

```typescript
import { useForm } from '../../../hooks';
import { TextInput, Button } from '../../../components/common';

const { values, errors, handleChange, handleSubmit } = useForm(
  { email: '', password: '' },
  async (values) => {
    // Submit logic
  }
);

return (
  <>
    <TextInput
      value={values.email}
      onChangeText={(text) => handleChange({ target: { name: 'email', value: text } })}
      error={errors.email}
    />
    <Button onPress={() => handleSubmit()} title="Submit" />
  </>
);
```

## ✅ Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Run linter
npm run lint

# Reset project
npm run reset-project

# Build APK (Android)
eas build --platform android

# Build IPA (iOS)
eas build --platform ios
```

## 🔌 API Integration

### Authentication Flow

```typescript
import { useAuth } from "../context/AuthContext";

const { login, logout, user, token } = useAuth();

// Login
await login(email, password);

// Logout
await logout();
```

### Making API Calls

```typescript
import apiService from "../services/api-service";

// Get user profile
const profile = await apiService.getProfile();

// Create post
await apiService.createPost({ title, content });

// Apply for job
await apiService.applyForJob(jobId, resume);
```

### Error Handling

```typescript
try {
  const data = await apiService.getData();
} catch (error) {
  const message = handleApiError(error);
  Alert.alert("Error", message);
}
```

## 🎨 Component Usage

### Common Components

```typescript
// Button
<Button
  title="Click me"
  onPress={() => {}}
  variant="primary" // primary | secondary | outline | danger
  size="md" // sm | md | lg
  loading={false}
/>

// Text Input
<TextInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>

// Card
<Card onPress={() => {}}>
  <Typography>Content</Typography>
</Card>

// Badge
<Badge label="Easy" variant="success" size="sm" />

// Typography
<Typography variant="h1">Heading</Typography>
<Typography variant="body" color={COLORS.primary}>Text</Typography>
```

### Creating Custom Components

```typescript
// src/components/feature/CustomComponent.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../common';
import { COLORS, SPACING } from '../../constants';

interface Props {
  title: string;
  // other props
}

export const CustomComponent: React.FC<Props> = ({ title }) => {
  const styles = StyleSheet.create({
    container: {
      padding: SPACING.lg,
      backgroundColor: COLORS.background,
    },
  });

  return (
    <View style={styles.container}>
      <Typography variant="h4">{title}</Typography>
    </View>
  );
};
```

## 📝 Best Practices

### 1. Type Safety

Always use TypeScript types from `src/types/index.ts`

```typescript
import { User, Post, Job } from "../types";

const user: User = {
  _id: "1",
  email: "user@example.com",
  // ...
};
```

### 2. Code Organization

- One component per file
- Clear, descriptive names
- Export from index files for easier imports

### 3. Performance

- Use React.memo for expensive components
- Implement proper key props in lists
- Use useCallback for event handlers

### 4. Styling

- Use constants from `src/constants/` for colors, spacing
- Keep component-specific styles in StyleSheet
- Follow mobile-first responsive design

### 5. Error Handling

```typescript
try {
  // operation
} catch (error) {
  console.error("Error details:", error);
  // User-friendly error message
  Alert.alert("Error", "Something went wrong");
}
```

### 6. Naming Conventions

- Components: PascalCase (`UserProfile.tsx`)
- Files: kebab-case or PascalCase
- Functions: camelCase (`handleSubmit`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Types: PascalCase (`UserData`)

## 🐛 Debugging

### Enable Debug Mode

```typescript
// In development
if (__DEV__) {
  console.log("Debug info", data);
}
```

### Using Expo DevTools

```bash
npm start
# Press 'd' for DevTools
# Press 'j' for JavaScript debugger
```

### Mobile Device Testing

```bash
npm start
# Scan QR code with Expo Go app
```

## 📦 Adding New Dependencies

```bash
# Install package
npm install package-name

# Install dev dependency
npm install --save-dev @types/package-name

# Rebuild if necessary
npm start -- --clear
```

## 🔒 Environment Variables

Secure sensitive data:

```typescript
// Don't hardcode API keys
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

// Use for build-time configuration
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
```

## 📚 Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/routing/introduction/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Need Help?** Check the `PROJECT_STRUCTURE.md` file for detailed folder organization.
