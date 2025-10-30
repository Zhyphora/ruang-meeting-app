import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../theme";

export default function ScheduleScreen({ navigation }) {
  const items = [
    { time: "08:00 - 09:00", room: "Square Room" },
    { time: "09:00 - 10:00", room: "Square Room" },
    { time: "10:00 - 11:00", room: "Lungles Room" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Jadwal Ruang Meeting</Text>
          <Text style={styles.subtitle}>Agenda yang terjadwal hari ini</Text>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Kembali"
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons
            name="close"
            size={18}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {items.map((it, i) => (
          <View key={i} style={styles.item}>
            <View style={styles.itemIconWrap}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={18}
                color="#111"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTime}>{it.time}</Text>
              <Text style={styles.itemRoom}>{it.room}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#9CA3AF"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.page,
    backgroundColor: theme.colors.background,
    minHeight: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: "800",
    color: "#1F2D3D",
    fontFamily: theme.typography.fontFamilyBold,
  },
  subtitle: {
    marginTop: 4,
    color: theme.colors.muted,
    fontFamily: theme.typography.fontFamilyRegular,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF3FF",
    marginLeft: 10,
  },
  list: { marginTop: 8 },
  item: {
    backgroundColor: theme.colors.card,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  itemTime: {
    fontWeight: "700",
    color: "#111",
    fontFamily: theme.typography.fontFamilySemiBold,
  },
  itemRoom: {
    color: theme.colors.muted,
    marginTop: 2,
    fontFamily: theme.typography.fontFamilyRegular,
  },
});
