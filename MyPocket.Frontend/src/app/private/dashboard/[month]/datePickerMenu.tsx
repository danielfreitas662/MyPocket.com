'use client';

import { DatePicker, MonthPicker } from '@/components';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function DatePickerMenu({ month }: { month: string }) {
  const router = useRouter();
  return (
    <MonthPicker
      value={moment(month, 'YYYY-MM-DD')}
      onChange={(value) => router.push('/private/dashboard/' + value.format('YYYY-MM-DD'))}
    />
  );
}
export default DatePickerMenu;
