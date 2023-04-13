import { currencyNormalize } from '@/utils/formatters';
import '@testing-library/jest-dom';

describe('currencyNormalize', () => {
  it('should return 0 when input is undefined', () => {
    const result = currencyNormalize(undefined);
    expect(result).toBe(0);
  });
  it('should return 2.39 when input is R$ 2,39', () => {
    const result = currencyNormalize('R$ 2,39');
    expect(result).toBe(2.39);
  });
  it('should return 2033.39 when input is R$ 2.033,39', () => {
    const result = currencyNormalize('R$ 2.033,39');
    expect(result).toBe(2033.39);
  });
  it('should return 2111033.39 when input is R$ 2.111.033,39', () => {
    const result = currencyNormalize('R$ 2.111.033,39');
    expect(result).toBe(2111033.39);
  });
});
