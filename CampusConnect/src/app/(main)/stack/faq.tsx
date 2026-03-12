import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do I get started with CampusConnect?",
      answer:
        "Simply sign up with your email, complete your profile, and start exploring our coding challenges, resources, and community features.",
    },
    {
      id: 2,
      question: "Is CampusConnect free?",
      answer:
        "CampusConnect offers free and premium features. Basic content is free, and premium features are available through our marketplace.",
    },
    {
      id: 3,
      question: "How can I track my learning progress?",
      answer:
        "Your progress is automatically tracked through our dashboard. You can view your completed quizzes, results, and learning roadmap.",
    },
    {
      id: 4,
      question: "Can I get help with specific coding problems?",
      answer:
        "Yes! You can ask questions in our community forum, reach out to our ambassadors, or access detailed tutorials and documentation.",
    },
    {
      id: 5,
      question: "How do I apply for jobs through CampusConnect?",
      answer:
        "Browse job opportunities in the Jobs section, prepare your resume, and apply directly to positions that match your skills.",
    },
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>FAQ</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="help-circle"
            size={48}
            color="#007AFF"
          />
          <Text style={styles.heading}>Frequently Asked Questions</Text>
          <Text style={styles.description}>
            Find answers to common questions about CampusConnect
          </Text>
        </View>

        <View style={styles.section}>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleExpand(faq.id)}
              >
                <Text style={styles.question}>{faq.question}</Text>
                <MaterialCommunityIcons
                  name={expandedId === faq.id ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#007AFF"
                />
              </TouchableOpacity>
              {expandedId === faq.id && (
                <View style={styles.faqContent}>
                  <Text style={styles.answer}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Still have questions?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  faqItem: {
    marginBottom: 12,
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  question: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    marginRight: 12,
  },
  faqContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
  },
  answer: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  contactSection: {
    alignItems: "center",
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
