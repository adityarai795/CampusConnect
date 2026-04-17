// import React, { useEffect } from "react";
// import { View, ScrollView, StyleSheet } from "react-native";
// import {
//   Card,
//   Typography,
//   Button,
//   TextInput,
// } from "../../../../components/common";
// import { SPACING, COLORS } from "../../../../constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { api } from "@/src/services/api";
// import axios from "axios";

// export default function ProfileScreen() {

//   const [firstName, setFirstName] = React.useState("John");
//   const [lastName, setLastName] = React.useState("Doe");
//   const [email, setEmail] = React.useState("john@example.com");
//   const [bio, setBio] = React.useState("Love coding and solving problems");
//   const [college, setCollege] = React.useState("Mumbai University");
//   const [branch, setBranch] = React.useState("Computer Science");

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: COLORS.background,
//     },
//     header: {
//       backgroundColor: COLORS.primary,
//       padding: SPACING.lg,
//       paddingTop: SPACING["2xl"],
//       alignItems: "center",
//     },
//     avatar: {
//       width: 80,
//       height: 80,
//       borderRadius: 40,
//       backgroundColor: COLORS.gray300,
//       justifyContent: "center",
//       alignItems: "center",
//       marginBottom: SPACING.md,
//     },
//     avatarText: {
//       fontSize: 32,
//     },
//     headerName: {
//       color: "#FFFFFF",
//       textAlign: "center",
//     },
//     headerEmail: {
//       color: "rgba(255, 255, 255, 0.8)",
//       marginTop: SPACING.xs,
//       textAlign: "center",
//     },
//     content: {
//       padding: SPACING.lg,
//     },
//     section: {
//       marginBottom: SPACING["2xl"],
//     },
//     sectionTitle: {
//       marginBottom: SPACING.md,
//       color: COLORS.text,
//     },
//     footer: {
//       padding: SPACING.lg,
//       borderTopWidth: 1,
//       borderTopColor: COLORS.gray200,
//     },
//   });
//   const fetchProfileData = async () => {
//     const token = await AsyncStorage.getItem("token");
//     console.log("Fetching profile data with token:", token);
//     const response = await axios.get("https://api.collegeconnect.me/profile/profile_get", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("Profile data response:", response);
//     if (response.status === 200) {
//       const data = response.data;
//       setFirstName(data.first_name);
//       setLastName(data.last_name);
//       setEmail(data.email);
//       setBio(data.bio);
//       setCollege(data.college);
//       setBranch(data.branch);
//     } else {
//       console.error("Failed to fetch profile data:", response);
//     }
//   }

//   useEffect(() => {
//     console.log("ProfileScreen mounted");
//     fetchProfileData();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.avatar}>
//           <Typography style={styles.avatarText}>👤</Typography>
//         </View>
//         <Typography variant="h3" weight="700" style={styles.headerName}>
//           {firstName} {lastName}
//         </Typography>
//         <Typography style={styles.headerEmail}>{email}</Typography>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <View style={styles.section}>
//           <Typography variant="h4" weight="600" style={styles.sectionTitle}>
//             Personal Information
//           </Typography>
//           <TextInput
//             label="First Name"
//             value={firstName}
//             onChangeText={setFirstName}
//           />
//           <TextInput
//             label="Last Name"
//             value={lastName}
//             onChangeText={setLastName}
//           />
//           <TextInput
//             label="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//         </View>

//         <View style={styles.section}>
//           <Typography variant="h4" weight="600" style={styles.sectionTitle}>
//             Education
//           </Typography>
//           <TextInput
//             label="College"
//             value={college}
//             onChangeText={setCollege}
//           />
//           <TextInput label="Branch" value={branch} onChangeText={setBranch} />
//         </View>

//         <View style={styles.section}>
//           <Typography variant="h4" weight="600" style={styles.sectionTitle}>
//             Bio
//           </Typography>
//           <TextInput
//             label="About You"
//             value={bio}
//             onChangeText={setBio}
//             multiline
//             numberOfLines={4}
//           />
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <Button title="Save Changes" onPress={() => {}} />
//       </View>
//     </View>
//   );
// }

import React from "react";

export default function ProfileScreen() {
  return <div>index</div>;
}
