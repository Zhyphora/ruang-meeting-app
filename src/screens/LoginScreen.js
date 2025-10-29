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
import { AuthContext } from "../context/AuthContext";

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
      <View style={styles.container}>
        <Text style={styles.header}>Ruangan Meeting</Text>
        <View style={styles.card}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.button}
            onPress={submit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  card: {
    width: "86%",
    backgroundColor: "#f7f9fc",
    padding: 20,
    borderRadius: 8,
    alignItems: "stretch",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "#b91c1c",
    marginBottom: 8,
  },
});
