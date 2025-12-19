import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type AuthButtonProps = {
  label: string;
  onPress?: () => void;
  logo?: 'logo-google' | 'logo-apple' | 'logo-facebook';
  color?: string;
  borderColor?: string;
  labelColor?: string;
};

const AuthButton = ({ logo, label, onPress, color, borderColor, labelColor }: AuthButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        { backgroundColor: color, borderColor: borderColor, borderWidth: borderColor ? 1 : 0 },
      ]}
      onPress={onPress}
    >
      {logo && <Ionicons name={logo} size={18} color={labelColor} />}
      <Text style={[styles.buttonLabel, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 12,
    gap: 12,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AuthButton;
