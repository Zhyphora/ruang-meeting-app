import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
} from "react-native";

export default function SplashScreen({ onFinish }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, 1800);

    // Looping background pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Logo entrance + title fade
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        delay: 400,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearTimeout(t);
  }, [onFinish, pulse, logoScale, titleOpacity]);

  const ringStyle = (multiplier) => ({
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [1, multiplier],
        }),
      },
    ],
    opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }),
  });

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Decorative blobs */}
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      <View style={styles.center}>
        <View style={styles.logoWrap}>
          <Animated.View style={[styles.ring, ringStyle(1.6)]} />
          <Animated.View style={[styles.ring, ringStyle(1.3)]} />

          <Animated.View
            style={[styles.logo, { transform: [{ scale: logoScale }] }]}
          >
            <View style={styles.logoInner} />
          </Animated.View>
        </View>

        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          Ruang Meeting
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, { opacity: titleOpacity }]}>
          Aplikasi reservasi ruang rapat
        </Animated.Text>
      </View>
    </View>
  );
}

const PRIMARY = "#3558F4"; // brand-ish blue
const ACCENT = "#BBD1FF"; // soft blue tint
const BG = "#F6F8FF";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Soft abstract shapes
  blobTop: {
    position: "absolute",
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: ACCENT,
    opacity: 0.45,
  },
  blobBottom: {
    position: "absolute",
    bottom: -90,
    left: -70,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#E6EEFF",
    opacity: 0.6,
  },
  logoWrap: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: PRIMARY,
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PRIMARY,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  logoInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    opacity: 0.9,
  },
  title: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "800",
    color: "#1F2D3D",
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
});
