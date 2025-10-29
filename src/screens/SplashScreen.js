import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, 1800);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoPlaceholder} />
        <Text style={styles.title}>Ruang Meeting</Text>
        <Text style={styles.subtitle}>Aplikasi reservasi ruang rapat</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7fb",
  },
  card: {
    alignItems: "center",
  },
  logoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#dfe7ff",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2d3d",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
  },
});
