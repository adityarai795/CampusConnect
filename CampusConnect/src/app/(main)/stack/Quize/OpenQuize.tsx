import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const questionsData = [
  {
    question: "What is JavaScript?",
    options: ["Programming Language", "Database", "OS", "Browser"],
    answer: "Programming Language",
  },
  {
    question: "Which keyword is used to declare variable?",
    options: ["var", "int", "string", "float"],
    answer: "var",
  },
  {
    question: "Which is NOT a JS framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django",
  },
  {
    question: "Which method is used for API calls?",
    options: ["fetch", "map", "filter", "push"],
    answer: "fetch",
  },
];

const OpenQuize = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option:any) => {
    if (option === questionsData[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ < questionsData.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  // ✅ RESULT SCREEN
  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Completed 🎉</Text>

        <Text style={styles.score}>
          Score: {score}/{questionsData.length}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
          }}
        >
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questionsData[currentQ];

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentQ + 1}/{questionsData.length}
      </Text>

      <Text style={styles.question}>{q.question}</Text>

      {q.options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionBtn}
          onPress={() => handleAnswer(opt)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OpenQuize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
  },
  optionBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  selected: {
    borderColor: "#4f46e5",
    backgroundColor: "#e0e7ff",
  },
  startBtn: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  startText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  progress: {
    marginBottom: 10,
    color: "#666",
  },
  score: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
