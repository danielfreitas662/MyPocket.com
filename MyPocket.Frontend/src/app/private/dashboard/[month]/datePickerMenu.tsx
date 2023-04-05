'use client';

import { DatePicker } from '@/components';
import { useRouter } from 'next/navigation';

function DatePickerMenu({ month }: { month: string }) {
  const router = useRouter();
  return <DatePicker value={month} onChange={(e) => router.push('/private/dashboard/' + e.target.value)} />;
}
export default DatePickerMenu;
