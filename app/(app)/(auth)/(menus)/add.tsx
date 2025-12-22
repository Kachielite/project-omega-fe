import React from 'react';
import { Link } from 'expo-router';

export default function Add() {
  return (
    <Link.Menu>
      <Link.MenuAction title="Action 1" onPress={() => {}} />
      <Link.MenuAction title="Action 2" onPress={() => {}} />
    </Link.Menu>
  );
}
