import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Border, Card, Radius, Shadow, Spacing } from '@/core/common/constants/dimensions';
import { TextStyles } from '@/core/common/constants/fonts';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import React from 'react';
import { ITask } from '@/features/task/interfaces';
import { GlassView } from 'expo-glass-effect';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TaskListWrapper = ({ children }: { children: React.ReactNode }) => {
  return <View style={[styles.wrapper]}>{children}</View>;
};

const TaskListHeader = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.header}>{children}</View>;
};

const TaskListTitle = ({ title }: { title: string }) => {
  const colors = useThemeColors();
  return <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>;
};

const TaskSeeAll = ({ onPress }: { onPress: () => void }) => {
  const colors = useThemeColors();
  return (
    <Text style={[styles.seeAll, { color: colors.textPrimary }]} onPress={onPress}>
      See All
    </Text>
  );
};

const TaskListDatePicker = ({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (text: Date) => void;
}) => {
  const colors = useThemeColors();
  const [show, setShow] = React.useState(false);

  const setDate = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event;
    const timestamp = (event.nativeEvent as any)?.timestamp;
    if (type === 'set') {
      const newDate = date ?? (timestamp ? new Date(timestamp) : undefined);
      if (newDate) {
        onDateChange(newDate);
      }
    }
    setShow(false);
  };
  return (
    <View style={[styles.datePicker, { borderColor: colors.border }]}>
      {/* TextInput doesn't have onPress; use onFocus to open the picker */}
      <TextInput
        style={styles.date}
        value={moment(date).format('DD-MMM-YYYY')}
        onFocus={() => setShow(true)}
      />
      {show && <RNDateTimePicker value={date} onChange={setDate} mode="datetime" />}
    </View>
  );
};

const TaskItem = ({ item }: { item: ITask }) => {
  const colors = useThemeColors();
  return (
    <GlassView style={styles.itemContainer} tintColor={colors.cardBackground}>
      <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
      <View style={styles.dueDateContainer}>
        <View style={styles.dueDateItem}>
          <View style={[styles.dueDateItemIcon, { backgroundColor: colors.cardBorder }]}>
            <Ionicons name="calendar-sharp" size={8} color={colors.textPrimary} />
          </View>
          <Text style={[styles.dueDateText, { color: colors.textPrimary }]}>
            {moment(item.due_date).format('DD-MMM')}
          </Text>
        </View>
        <View style={styles.dueDateItem}>
          <View style={[styles.dueDateItemIcon, { backgroundColor: colors.cardBorder }]}>
            <MaterialCommunityIcons name="clock-time-three" size={10} color={colors.textPrimary} />
          </View>
          <Text style={[styles.dueDateText, { color: colors.textPrimary }]}>
            {moment(item.due_date).format('hh:mm')}
          </Text>
        </View>
      </View>
      <View style={[styles.itemMeta, { backgroundColor: colors.cardBorder }]}>
        <Text
          style={[
            styles.itemMetaTag,
            { backgroundColor: colors.cardBackground, color: colors.textPrimary },
          ]}
        >
          {item.priority}
        </Text>
        <Text
          style={[
            styles.itemMetaTag,
            { backgroundColor: colors.cardBackground, color: colors.textPrimary },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </GlassView>
  );
};

const TaskListEmpty = () => {
  const colors = useThemeColors();
  return (
    <GlassView style={styles.emptyStateContainer}>
      <Ionicons name="folder-open-outline" size={90} color="black" />
      <Text style={[styles.emptyStateTitle, { color: colors.textPrimary }]}>
        No tasks available.
      </Text>
      <TouchableOpacity
        style={[styles.emptyStateBtn, { backgroundColor: colors.textPrimary }]}
        onPress={() => console.log('clicked')}
      >
        <Ionicons name="add-outline" size={24} color={colors.background} />
        <Text style={[{ color: colors.background }]}>Add New Task</Text>
      </TouchableOpacity>
    </GlassView>
  );
};

const TaskItems = ({ items }: { items: ITask[] }) => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets?.() ?? { bottom: 0 };
  if (items.length === 0) {
    return <TaskListEmpty />;
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={items}
      renderItem={({ item }) => <TaskItem item={item} />}
      contentContainerStyle={{
        paddingBottom: Math.max(insets.bottom + 20, 80),
        backgroundColor: colors.background,
      }}
      style={styles.itemsContainer}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.md,
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    ...TextStyles.title3,
  },
  seeAll: {
    ...TextStyles.title5,
  },
  datePicker: {
    borderWidth: 1,
    width: '20%',
    borderRadius: Radius.md,
  },
  date: {
    ...TextStyles.body,
  },
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Card.paddingSm,
    borderRadius: Radius.md,
    height: Dimensions.get('window').height * 0.5,
    gap: Spacing.lg,
  },
  emptyStateTitle: {
    ...TextStyles.body,
  },
  emptyStateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: Radius.md,
    gap: Spacing.md,
    borderWidth: Border.thin,
    ...TextStyles.button,
  },
  itemsContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: Card.paddingSm,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    gap: Spacing.lg,
    ...Shadow.md,
  },
  itemTitle: {
    ...TextStyles.title3,
  },
  dueDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dueDateItemIcon: {
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.round,
  },
  dueDateText: {
    ...TextStyles.label,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: Radius.xl,
  },
  itemMetaTag: {
    ...TextStyles.bodyExtraSmall,
    padding: Spacing.sm,
    borderRadius: Radius.xl,
  },
});

export {
  TaskListWrapper,
  TaskListHeader,
  TaskListTitle,
  TaskSeeAll,
  TaskListDatePicker,
  TaskItems,
};
