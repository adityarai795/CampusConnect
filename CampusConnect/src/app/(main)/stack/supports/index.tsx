import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Typography, Button } from "../../../../components/common";
import { SPACING, COLORS } from "../../../../constants";

export default function HelpScreen() {
  const [expandedFaq, setExpandedFaq] = React.useState<string | null>(null);

  const faqs = [
    {
      id: "1",
      question: "How do I post in the community?",
      answer:
        'Navigate to the Community tab, click on "Create Post", and share your content with others.',
    },
    {
      id: "2",
      question: "How can I apply for jobs?",
      answer:
        'Go to the Jobs section, browse available opportunities, and click "Apply Now" to submit your application.',
    },
    {
      id: "3",
      question: "How do I track my coding progress?",
      answer:
        "Visit the Placement Kit section to see your solved problems and progress statistics.",
    },
    {
      id: "4",
      question: "Can I purchase items on the marketplace?",
      answer:
        "Yes! Browse products in the Marketplace section, add to cart, and checkout securely.",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      backgroundColor: COLORS.primary,
      padding: SPACING.lg,
      paddingTop: SPACING["2xl"],
    },
    headerTitle: {
      color: "#FFFFFF",
      marginBottom: SPACING.sm,
    },
    content: {
      padding: SPACING.lg,
    },
    faqCard: {
      marginBottom: SPACING.md,
      cursor: "pointer",
    },
    faqQuestion: {
      marginBottom: SPACING.sm,
      color: COLORS.primary,
    },
    faqAnswer: {
      marginTop: SPACING.md,
      paddingTop: SPACING.md,
      borderTopWidth: 1,
      borderTopColor: COLORS.gray200,
    },
    contactSection: {
      marginTop: SPACING["2xl"],
      alignItems: "center",
    },
    contactTitle: {
      marginBottom: SPACING.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" weight="700" style={styles.headerTitle}>
          Help & Support
        </Typography>
        <Typography style={{ color: "rgba(255, 255, 255, 0.8)" }}>
          Get answers to common questions
        </Typography>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Typography
          variant="h4"
          weight="600"
          style={{ marginBottom: SPACING.lg }}
        >
          Frequently Asked Questions
        </Typography>

        {faqs.map((faq) => (
          <Card
            key={faq.id}
            style={styles.faqCard}
            onPress={() =>
              setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
            }
          >
            <Typography variant="h4" weight="600" style={styles.faqQuestion}>
              {faq.question}
            </Typography>
            {expandedFaq === faq.id && (
              <View style={styles.faqAnswer}>
                <Typography variant="body" color={COLORS.textSecondary}>
                  {faq.answer}
                </Typography>
              </View>
            )}
          </Card>
        ))}

        <View style={styles.contactSection}>
          <Typography variant="h4" weight="600" style={styles.contactTitle}>
            Still need help?
          </Typography>
          <Typography
            variant="body"
            color={COLORS.textSecondary}
            style={{ marginBottom: SPACING.lg }}
          >
            Contact our support team
          </Typography>
          <Button title="Send Feedback" onPress={() => {}} variant="primary" />
        </View>
      </ScrollView>
    </View>
  );
}
