import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import theme from "../theme";

export default function ScheduleScreen({ navigation }) {
  const items = [
    { time: "08:00 - 09:00", room: "Square Room" },
    { time: "09:00 - 10:00", room: "Square Room" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Jadwal Ruang Meeting</Text>
      <View style={styles.list}>
        {items.map((it, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.itemTime}>{it.time}</Text>
            <Text style={styles.itemRoom}>{it.room}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} activeOpacity={0.9}>
        <Text style={styles.backText}>◀ Kembali</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.page,
    backgroundColor: theme.colors.background,
    minHeight: "100%",
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: "800",
    marginBottom: 12,
    color: "#1F2D3D",
  },
  list: { marginTop: 8 },
  item: {
    backgroundColor: theme.colors.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  itemTime: { fontWeight: "700", color: "#111" },
  itemRoom: { color: theme.colors.muted, marginTop: 4 },
  back: {
    alignSelf: "center",
    backgroundColor: "#EEF3FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginTop: 20,
  },
  backText: { color: theme.colors.primary, fontWeight: "700" },
});
