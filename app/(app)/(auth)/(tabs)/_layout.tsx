import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import useThemeColors from '@/core/common/hooks/use-theme-colors';

export default function Layout() {
  const colors = useThemeColors();
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Label hidden>Home</Label>
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          selectedColor={colors.textPrimary}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="project">
        <Label hidden>Projects</Label>
        <Icon
          sf={{ default: 'folder', selected: 'folder.fill' }}
          selectedColor={colors.textPrimary}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label hidden>Settings</Label>
        <Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
          selectedColor={colors.textPrimary}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
