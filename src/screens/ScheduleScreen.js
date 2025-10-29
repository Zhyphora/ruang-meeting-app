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
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={{ color: theme.colors.primary }}>Back</Text>
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
  title: { fontSize: theme.typography.h2, fontWeight: "700", marginBottom: 12 },
  list: { marginTop: 8 },
  item: {
    backgroundColor: theme.colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTime: { fontWeight: "600" },
  itemRoom: { color: theme.colors.muted, marginTop: 4 },
  back: { alignItems: "center", marginTop: 20 },
});
