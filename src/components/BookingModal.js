import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme from "../theme";

export default function BookingModal({ visible, onClose, onSubmit }) {
  const [divisi, setDivisi] = useState("");
  const [room, setRoom] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [peserta, setPeserta] = useState("");

  const DIVISI_OPTIONS = ["Finance", "HR", "Engineering", "Marketing"];
  const ROOM_OPTIONS = ["Ruang A", "Ruang B", "Ruang C", "Ruang D"];

  const [showDivisiOptions, setShowDivisiOptions] = useState(false);
  const [showRoomOptions, setShowRoomOptions] = useState(false);
  const [showTanggalPicker, setShowTanggalPicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const canSubmit = divisi && room && tanggal && start && end && peserta;

  function submit() {
    if (!canSubmit) return;

    const booking = {
      divisi,
      nama_ruangan: room,
      tanggal_meeting: tanggal,
      waktu_mulai: start,
      waktu_selesai: end,
      jumlah_peserta: parseInt(peserta, 10) || 0,
    };

    onSubmit(booking);

    // reset fields
    setDivisi("");
    setRoom("");
    setTanggal("");
    setStart("");
    setEnd("");
    setPeserta("");
    setShowDivisiOptions(false);
    setShowRoomOptions(false);
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={styles.centerBox}
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.titleWrap}>
                    <View style={styles.titleIcon}>
                      <MaterialCommunityIcons
                        name="calendar-plus"
                        size={18}
                        color="#3558F4"
                      />
                    </View>
                    <Text style={styles.title}>Booking Ruang Meeting</Text>
                  </View>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeBtn}
                    accessibilityLabel="Tutup"
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={18}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={{ maxHeight: 620 }}
                  contentContainerStyle={{ paddingBottom: 6 }}
                  showsVerticalScrollIndicator={false}
                >
                  {/* Divisi */}
                  <Text style={styles.label}>Divisi</Text>
                  <TouchableOpacity
                    style={styles.field}
                    onPress={() => setShowDivisiOptions((v) => !v)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={
                        divisi ? styles.fieldText : styles.fieldPlaceholder
                      }
                    >
                      {divisi || "Pilih divisi"}
                    </Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={22}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                  {showDivisiOptions && (
                    <View style={styles.optionsBox}>
                      {DIVISI_OPTIONS.map((d) => (
                        <TouchableOpacity
                          key={d}
                          style={styles.option}
                          onPress={() => {
                            setDivisi(d);
                            setShowDivisiOptions(false);
                          }}
                        >
                          <Text>{d}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Ruang Meeting */}
                  <Text style={styles.label}>Ruang Meeting</Text>
                  <TouchableOpacity
                    style={styles.field}
                    onPress={() => setShowRoomOptions((v) => !v)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={room ? styles.fieldText : styles.fieldPlaceholder}
                    >
                      {room || "Pilih ruangan"}
                    </Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={22}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                  {showRoomOptions && (
                    <View style={styles.optionsBox}>
                      {ROOM_OPTIONS.map((r) => (
                        <TouchableOpacity
                          key={r}
                          style={styles.option}
                          onPress={() => {
                            setRoom(r);
                            setShowRoomOptions(false);
                          }}
                        >
                          <Text>{r}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Tanggal */}
                  <Text style={styles.label}>Tanggal</Text>
                  <TouchableOpacity
                    style={styles.field}
                    onPress={() => {
                      setTempDate(new Date());
                      setShowTanggalPicker(true);
                    }}
                  >
                    <Text
                      style={
                        tanggal ? styles.fieldText : styles.fieldPlaceholder
                      }
                    >
                      {tanggal || "Pilih tanggal meeting"}
                    </Text>
                    <MaterialCommunityIcons
                      name="calendar"
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                  {showTanggalPicker && (
                    <DateTimePicker
                      value={tempDate}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(e, d) => {
                        setShowTanggalPicker(false);
                        if (d) {
                          const yyyy = d.getFullYear();
                          const mm = String(d.getMonth() + 1).padStart(2, "0");
                          const dd = String(d.getDate()).padStart(2, "0");
                          setTanggal(`${yyyy}-${mm}-${dd}`);
                        }
                      }}
                    />
                  )}

                  {/* Waktu Mulai & Selesai */}
                  <View style={styles.row2}>
                    <View style={{ flex: 1, marginRight: 6 }}>
                      <Text style={styles.label}>Waktu Mulai</Text>
                      <TouchableOpacity
                        style={styles.field}
                        onPress={() => {
                          setTempDate(new Date());
                          setShowStartPicker(true);
                        }}
                      >
                        <Text
                          style={
                            start ? styles.fieldText : styles.fieldPlaceholder
                          }
                        >
                          {start || "Pilih waktu"}
                        </Text>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={20}
                          color="#6B7280"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginLeft: 6 }}>
                      <Text style={styles.label}>Waktu Selesai</Text>
                      <TouchableOpacity
                        style={styles.field}
                        onPress={() => {
                          setTempDate(new Date());
                          setShowEndPicker(true);
                        }}
                      >
                        <Text
                          style={
                            end ? styles.fieldText : styles.fieldPlaceholder
                          }
                        >
                          {end || "Pilih waktu"}
                        </Text>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={20}
                          color="#6B7280"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {showStartPicker && (
                    <DateTimePicker
                      value={tempDate}
                      mode="time"
                      is24Hour={true}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(e, d) => {
                        setShowStartPicker(false);
                        if (d) {
                          const hh = String(d.getHours()).padStart(2, "0");
                          const mm = String(d.getMinutes()).padStart(2, "0");
                          setStart(`${hh}:${mm}`);
                        }
                      }}
                    />
                  )}

                  {showEndPicker && (
                    <DateTimePicker
                      value={tempDate}
                      mode="time"
                      is24Hour={true}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(e, d) => {
                        setShowEndPicker(false);
                        if (d) {
                          const hh = String(d.getHours()).padStart(2, "0");
                          const mm = String(d.getMinutes()).padStart(2, "0");
                          setEnd(`${hh}:${mm}`);
                        }
                      }}
                    />
                  )}

                  {/* Jumlah Peserta */}
                  <Text style={styles.label}>Jumlah Peserta</Text>
                  <View style={styles.inputRow}>
                    <MaterialCommunityIcons
                      name="account-group-outline"
                      size={20}
                      color="#6B7280"
                    />
                    <TextInput
                      placeholder="Contoh: 10"
                      value={peserta}
                      onChangeText={setPeserta}
                      keyboardType="numeric"
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.submit, !canSubmit && styles.submitDisabled]}
                    onPress={submit}
                    activeOpacity={0.9}
                    disabled={!canSubmit}
                  >
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.textBtn} onPress={onClose}>
                    <Text style={{ color: theme.colors.primary }}>Cancel</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  centerBox: { width: "100%", maxWidth: 520 },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  titleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF3FF",
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  title: { fontSize: 18, fontWeight: "800", color: "#111" },
  label: { marginTop: 8, marginBottom: 6, color: "#6B7280" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    color: "#111",
  },
  field: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldPlaceholder: { color: theme.colors.muted },
  fieldText: { color: "#111" },
  optionsBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  option: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  row2: { flexDirection: "row" },
  submit: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
    alignItems: "center",
    width: "100%",
  },
  submitDisabled: { backgroundColor: "#9CA3AF" },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  textBtn: { alignItems: "center", marginTop: 10 },
});
