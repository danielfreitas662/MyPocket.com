import { currencyFormat } from '@/utils/formatters';
import '@testing-library/jest-dom';

describe('currencyFormatter', () => {
  it('should return R$ 0,00 when input is undefined', () => {
    const result = currencyFormat(undefined, 'pt-BR').replace(/\xA0/, ' ');
    expect(result).toBe('R$ 0,00');
  });
  it('should return R$ 2,39 when input is 2.39', () => {
    const result = currencyFormat(2.39, 'pt-BR').replace(/\xA0/, ' ');
    expect(result).toBe('R$ 2,39');
  });
  it('should return R$ 2.033,39 when input is 2033.39', () => {
    const result = currencyFormat(2033.39, 'pt-BR').replace(/\xA0/, ' ');
    expect(result).toBe('R$ 2.033,39');
  });
});
