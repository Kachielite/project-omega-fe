import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Radius, Spacing } from '@/core/common/constants/dimensions';
import { TextStyles } from '@/core/common/constants/fonts';
import useThemeColors from '@/core/common/hooks/use-theme-colors';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import React from 'react';
import { ITask } from '@/features/task/interfaces';
import { GlassView } from 'expo-glass-effect';
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const TaskListWrapper = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.wrapper}>{children}</View>;
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
    <GlassView>
      <Text>{item.title}</Text>
      <View>
        <View>
          <Ionicons name="calendar-sharp" size={10} color={colors.textPrimary} />
          <Text>{moment(item.due_date).format('DD-MMM-YYYY')}</Text>
        </View>
        <View>
          <MaterialCommunityIcons name="clock-time-three" size={10} color={colors.textPrimary} />
          <Text>{moment(item.due_date).format('hh:mm')}</Text>
        </View>
      </View>
      <View>
        <Text>{item.priority}</Text>
        <Text>{item.status}</Text>
      </View>
    </GlassView>
  );
};

const TaskListEmpty = () => {
  const colors = useThemeColors();
  return (
    <View>
      <FontAwesome6 name="list-alt" size={24} color="black" />
      <Text style={{ color: colors.textSecondary }}>No tasks available.</Text>
      <TouchableOpacity onPress={() => console.log('clicked')}>
        <Text style={{ color: colors.textPrimary }}>Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const TaskItems = ({ items }: { items: ITask[] }) => {
  if (items.length === 0) {
    return <TaskListEmpty />;
  }
  return (
    <GlassView>
      {items.map((item) => (
        <TaskItem key={item.id} item={item} />
      ))}
    </GlassView>
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
    ...TextStyles.title,
  },
  seeAll: {
    ...TextStyles.body,
  },
  datePicker: {
    borderWidth: 1,
    width: '20%',
    borderRadius: Radius.md,
  },
  date: {
    ...TextStyles.body,
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
