import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../theme";

export default function AlertBox({
  message = "Sukses",
  type = "success",
  onClose,
}) {
  const bg =
    type === "success" ? "#eef2ff" : type === "error" ? "#fee2e2" : "#eef2ff";

  return (
    <View style={[styles.container]}>
      <View style={[styles.card, { backgroundColor: bg }]}>
        <Text style={styles.message}>{message}</Text>
      </View>
      {onClose ? (
        <TouchableOpacity style={styles.back} onPress={onClose}>
          <Text style={{ color: theme.colors.primary }}>Close</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.page,
    backgroundColor: theme.colors.background,
  },
  card: { padding: 16, borderRadius: 8 },
  message: { color: "#111827" },
  back: { alignItems: "center", marginTop: 12 },
});
