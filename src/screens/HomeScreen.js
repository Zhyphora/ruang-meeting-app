import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../theme";
import { AuthContext } from "../context/AuthContext";
import { BookingContext } from "../context/BookingContext";
import BookingModal from "../components/BookingModal";
import AlertBox from "../components/AlertBox";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { schedule, loading, error, addBooking } = useContext(BookingContext);
  const name = (user && user.name) || "Yosi";

  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Ini alert");
  const [alertType, setAlertType] = useState("info");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.hello}>Selamat datang,</Text>
          <Text style={styles.welcome}>{name}</Text>
          <Text style={styles.sub}>Admin Ruang Meeting</Text>
        </View>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={22} color="#3558F4" />
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={[styles.card, styles.cardPrimary]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons name="calendar-plus" size={24} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: "#fff" }]}>
              Pesan Ruangan
            </Text>
            <Text style={[styles.cardDesc, { color: "#E7ECFF" }]}>
              Buat reservasi ruang meeting baru
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Schedule")}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons name="calendar-text" size={24} color="#111" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Jadwal Ruang Meeting</Text>
            <Text style={styles.cardDesc}>
              Lihat agenda ruang meeting hari ini
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        <Text style={styles.sectionTitle}>Jadwal Ruang Meeting Hari Ini</Text>

        {alertVisible ? (
          <AlertBox
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertVisible(false)}
          />
        ) : loading ? (
          <ActivityIndicator
            style={{
              marginTop: 12,
            }}
          />
        ) : error ? (
          <Text
            style={{
              color: theme.colors.danger,
              marginTop: 12,
            }}
          >
            {error}
          </Text>
        ) : (
          schedule.map((s, idx) => (
            <View key={idx} style={styles.scheduleItem}>
              <Text
                style={styles.scheduleTime}
              >{`${s.waktu_mulai} - ${s.waktu_selesai}`}</Text>
              <Text style={styles.scheduleRoom}>{s.nama_ruangan}</Text>
            </View>
          ))
        )}

        <BookingModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={(item) => {
            addBooking(item);
            setModalVisible(false);
          }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <Text style={{ color: theme.colors.danger }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.page,
    paddingTop: theme.spacing.page + 6,
    borderBottomWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  hello: {
    color: theme.colors.muted,
    marginBottom: 2,
    fontFamily: theme.typography.fontFamilyRegular,
  },
  welcome: {
    fontSize: theme.typography.h2,
    fontWeight: "700",
    color: "#1F2D3D",
    fontFamily: theme.typography.fontFamilyBold,
  },
  sub: {
    color: theme.colors.muted,
    fontFamily: theme.typography.fontFamilyRegular,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: theme.spacing.page,
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.card,
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardPrimary: {
    backgroundColor: "#3558F4",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    fontFamily: theme.typography.fontFamilySemiBold,
  },
  cardDesc: {
    marginTop: 2,
    color: "#6B7280",
    fontFamily: theme.typography.fontFamilyRegular,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 8,
    color: "#1F2D3D",
    fontFamily: theme.typography.fontFamilyBold,
  },
  scheduleItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
  },
  scheduleTime: {
    fontWeight: "700",
    color: "#111",
    fontFamily: theme.typography.fontFamilySemiBold,
  },
  scheduleRoom: {
    color: theme.colors.muted,
    marginTop: 4,
    fontFamily: theme.typography.fontFamilyRegular,
  },
  footer: {
    padding: theme.spacing.page,
  },
  logout: {
    alignItems: "center",
  },
});
