import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/AuthContext";
import theme from "../theme";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("yosi@gmail.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  async function submit() {
    if (!email || !password) {
      setError("Email dan password diperlukan");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (
        result &&
        result.raw &&
        result.raw.message &&
        result.raw.status !== "success"
      ) {
        setError(result.raw.message || "Login failed");
      } else {
        navigation?.navigate("Home");
      }
    } catch (err) {
      setError((err && err.message) || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.topBlob} />
      <View style={styles.bottomBlob} />

      <View style={styles.container}>
        <View style={styles.brand}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={26}
              color="#fff"
            />
          </View>
          <Text style={styles.header}>Ruang Meeting</Text>
          <Text style={styles.subtitle}>Masuk untuk mengelola reservasi</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              color="#6B7280"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#6B7280"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={submit}
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialCommunityIcons name="login" size={18} color="#fff" />
                <Text style={styles.buttonText}>Sign In</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.background },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  brand: { alignItems: "center", marginBottom: 18 },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3558F4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#3558F4",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1F2D3D",
    fontFamily: theme.typography.fontFamilyBold,
  },
  subtitle: {
    marginTop: 6,
    color: theme.colors.muted,
    fontFamily: theme.typography.fontFamilyRegular,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    color: "#111",
    fontFamily: theme.typography.fontFamilyRegular,
  },
  button: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontFamily: theme.typography.fontFamilySemiBold,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 8,
    fontFamily: theme.typography.fontFamilyRegular,
  },
  topBlob: {
    position: "absolute",
    top: -120,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#EEF3FF",
  },
  bottomBlob: {
    position: "absolute",
    bottom: -140,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F6F8FF",
  },
});
