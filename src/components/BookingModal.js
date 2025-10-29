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
} from "react-native";
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

  function submit() {
    if (!divisi || !room || !tanggal || !start || !end || !peserta) {
      return;
    }

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
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.backdrop}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Booking Ruang Meeting</Text>

          {/* Divisi dropdown (dummy) */}
          <TouchableOpacity
            style={styles.field}
            onPress={() => setShowDivisiOptions((v) => !v)}
            activeOpacity={0.8}
          >
            <Text style={divisi ? styles.fieldText : styles.fieldPlaceholder}>
              {divisi || "Divisi"}
            </Text>
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

          {/* Ruangan dropdown (dummy) */}
          <TouchableOpacity
            style={styles.field}
            onPress={() => setShowRoomOptions((v) => !v)}
            activeOpacity={0.8}
          >
            <Text style={room ? styles.fieldText : styles.fieldPlaceholder}>
              {room || "Ruang Meeting"}
            </Text>
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

          {/* Tanggal, Waktu Mulai, Waktu Selesai (native pickers) */}
          <TouchableOpacity
            style={styles.field}
            onPress={() => {
              setTempDate(new Date());
              setShowTanggalPicker(true);
            }}
          >
            <Text style={tanggal ? styles.fieldText : styles.fieldPlaceholder}>
              {tanggal || "Tanggal Meeting"}
            </Text>
            <Text style={styles.fieldIcon}>📅</Text>
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

          <TouchableOpacity
            style={styles.field}
            onPress={() => {
              setTempDate(new Date());
              setShowStartPicker(true);
            }}
          >
            <Text style={start ? styles.fieldText : styles.fieldPlaceholder}>
              {start || "Waktu Mulai"}
            </Text>
            <Text style={styles.fieldIcon}>⏰</Text>
          </TouchableOpacity>
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

          <TouchableOpacity
            style={styles.field}
            onPress={() => {
              setTempDate(new Date());
              setShowEndPicker(true);
            }}
          >
            <Text style={end ? styles.fieldText : styles.fieldPlaceholder}>
              {end || "Waktu Selesai"}
            </Text>
            <Text style={styles.fieldIcon}>⏰</Text>
          </TouchableOpacity>
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

          <TextInput
            placeholder="Jumlah Peserta"
            value={peserta}
            onChangeText={setPeserta}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity style={styles.submit} onPress={submit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={{ color: theme.colors.primary }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "92%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  field: {
    borderWidth: 1,
    borderColor: "#F5D7D9",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldPlaceholder: { color: theme.colors.muted },
  fieldText: { color: "#111" },
  fieldIcon: { marginLeft: 8 },
  optionsBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F5D7D9",
    borderRadius: 8,
    marginTop: 6,
  },
  option: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#F5D7D9" },
  submit: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
    alignItems: "center",
    width: "100%",
  },
  submitText: { color: "#111", fontWeight: "600", fontSize: 18 },
  close: { alignItems: "center", marginTop: 10 },
});
