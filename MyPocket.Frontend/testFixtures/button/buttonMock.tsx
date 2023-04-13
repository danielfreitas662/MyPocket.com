import { Button } from '@/components';
import { useState } from 'react';

function OutterButton() {
  const [state, setState] = useState('Test');
  return <Button onClick={() => setState('Done')}>{state}</Button>;
}
export default OutterButton;
