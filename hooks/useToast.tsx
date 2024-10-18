import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";

const useToast = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // 'success' or 'error'
  const fadeAnim = useRef(new Animated.Value(0)).current; // For animation

  // Show the toast with animation
  const showToast = (msg: any, type: any) => {
    setMessage(msg);
    setType(type);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Hide toast after 3 seconds
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setMessage(""); // Clear the message after animation ends
      });
    }, 3000);
  };

  // Methods to display success or error messages
  const success = (msg: any) => showToast(msg, "success");
  const error = (msg: any) => showToast(msg, "error");

  const Toast = () =>
    message ? (
      <Animated.View
        style={[
          styles.toastContainer,
          type === "success" ? styles.success : styles.error,
          { opacity: fadeAnim },
        ]}
      >
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    ) : null;

  return { success, error, Toast };
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
  },
  success: {
    backgroundColor: "green",
  },
  error: {
    backgroundColor: "red",
  },
  toastText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default useToast;
