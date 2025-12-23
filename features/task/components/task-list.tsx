import {
  Dimensions,
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Border, Card, Radius, Spacing } from '@/core/common/constants/dimensions';
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
  const colors = useThemeColors();
  return <View style={[styles.wrapper, { backgroundColor: colors.background }]}>{children}</View>;
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
  onDateChange: (date: string) => void;
}) => {
  const colors = useThemeColors();
  const [show, setShow] = React.useState(false);

  const setDate = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event;
    const timestamp = (event.nativeEvent as any)?.timestamp;
    if (type === 'set') {
      const newDate = date ?? (timestamp ? new Date(timestamp) : undefined);
      if (newDate) {
        onDateChange(newDate.toISOString());
      }
    }
    setShow(false);
  };
  return (
    <View
      style={[
        styles.datePicker,
        { borderColor: colors.textPrimary, backgroundColor: colors.cardBackground },
      ]}
    >
      <Pressable onPress={() => setShow(true)}>
        <Text style={[styles.date, { color: colors.textPrimary }]}>
          {moment(date).format('DD/MM/YYYY')}
        </Text>
      </Pressable>
      {show && (
        <Modal transparent animationType="fade" onRequestClose={() => setShow(false)}>
          <Pressable style={styles.modalOverlay} onPress={() => setShow(false)}>
            <TouchableWithoutFeedback>
              <View style={[styles.pickerContainer, { backgroundColor: colors.cardBackground }]}>
                <RNDateTimePicker
                  value={date}
                  onChange={setDate}
                  mode="datetime"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const TaskItem = ({ item }: { item: ITask }) => {
  const colors = useThemeColors();
  const visibleCount = 3;
  const visibleTags = item.tags ? item.tags.slice(0, visibleCount) : [];
  const remaining = item.tags ? Math.max(0, item.tags.length - visibleTags.length) : 0;
  return (
    <View style={[styles.itemContainer, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
      <View style={styles.dueDateContainer}>
        <View style={styles.dueDateItem}>
          <View style={[styles.dueDateItemIcon, { backgroundColor: colors.cardBorder }]}>
            <Ionicons name="calendar-sharp" size={10} color={colors.textPrimary} />
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
        {/* Tags: show up to 3, overlapping chips, then a +N chip if more */}
        <View style={[styles.chipsContainer, { maxWidth: '70%' }]}>
          {visibleTags.map((tag, idx) => (
            <View
              key={tag.id}
              style={[
                styles.chip,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder,
                  marginLeft: idx === 0 ? 0 : -12,
                  zIndex: idx + 1,
                },
              ]}
            >
              <Text style={[styles.chipText, { color: colors.textPrimary }]} numberOfLines={1}>
                {tag.name}
              </Text>
            </View>
          ))}
          {remaining > 0 && (
            <View
              style={[
                styles.chip,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.textPrimary,
                  marginLeft: visibleTags.length === 0 ? 0 : -12,
                  zIndex: visibleTags.length + 1,
                },
              ]}
            >
              <Text style={[styles.chipText, { color: colors.textPrimary }]} numberOfLines={1}>
                {`+${remaining}`}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.statusPill,
            {
              backgroundColor: colors.cardBackground,
              borderWidth: Border.thin,
              borderColor: colors.textPrimary,
              color: colors.textPrimary,
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );
};

const TaskListEmpty = ({ fullHeight = false }: { fullHeight?: boolean }) => {
  const colors = useThemeColors();
  return (
    <GlassView
      style={[
        styles.emptyStateContainer,
        { height: Dimensions.get('window').height * (fullHeight ? 0.7 : 0.5) },
      ]}
      tintColor={colors.cardBackground}
    >
      <Text style={[styles.emptyStateTitle, { color: colors.textPrimary }]}>
        No tasks available.
      </Text>
      <Ionicons name="folder-open-outline" size={90} color={colors.textPrimary} />
      <TouchableOpacity
        style={[styles.emptyStateBtn, { backgroundColor: colors.textPrimary }]}
        onPress={() => console.log('clicked')}
      >
        <Text style={[{ color: colors.background }]}>Add New Task</Text>
      </TouchableOpacity>
    </GlassView>
  );
};

const TaskItems = ({
  items,
  bottomPadding = 20,
  fullHeight = false,
}: {
  items: ITask[];
  bottomPadding?: number;
  fullHeight?: boolean;
}) => {
  const insets = useSafeAreaInsets?.() ?? { bottom: 0 };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={items}
      renderItem={({ item }) => <TaskItem item={item} />}
      contentContainerStyle={{
        paddingBottom: Math.max(insets.bottom + bottomPadding, 80),
      }}
      style={[
        styles.itemsContainer,
        {
          height: Dimensions.get('window').height * (fullHeight ? 1 : 0.6),
        },
      ]}
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      ListEmptyComponent={<TaskListEmpty fullHeight={fullHeight} />}
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
    borderWidth: Border.hairline,
    width: '25%',
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  date: {
    ...TextStyles.bodySmall,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  pickerContainer: {
    borderRadius: 12,
    padding: 8,
    // min width so picker isn't too narrow on small screens
    minWidth: 280,
    // let the picker size itself vertically
    overflow: 'hidden',
  },
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Card.paddingSm,
    borderRadius: Radius.md,
    gap: Spacing.lg,
  },
  emptyStateTitle: {
    ...TextStyles.title2,
  },
  emptyStateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
    gap: Spacing.md,
    borderWidth: Border.thin,
    ...TextStyles.title,
  },
  itemsContainer: {
    width: '100%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: Card.paddingSm,
    borderRadius: Radius.lg,
    gap: Spacing.lg,
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
    width: 18,
    height: 18,
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
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
    flexShrink: 1,
  },
  chip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.xl,
    borderWidth: Border.thin,
    marginRight: 8,
  },
  chipText: {
    ...TextStyles.bodyExtraSmall,
    fontSize: 12,
  },
  itemMetaTag: {
    ...TextStyles.bodyExtraSmall,
    padding: Spacing.sm,
    borderRadius: Radius.xl,
  },
  statusPill: {
    ...TextStyles.bodyExtraSmall,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.xl,
    minWidth: 72,
    textAlign: 'center',
    fontWeight: '600',
    flexShrink: 0,
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
