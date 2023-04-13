import { GetPattern } from '@/utils/patterns';
import '@testing-library/jest-dom';

describe('getPattern for email', () => {
  it('should be true correct email provided', () => {
    const result = GetPattern('email');
    expect(result.test('test@gmail.com')).toBeTruthy();
  });
  it('should not be true when correct email provided', () => {
    const result = GetPattern('email');
    expect(result.test('test@com')).toBeFalsy();
  });
  it('should not be true when correct email provided', () => {
    const result = GetPattern('email');
    expect(result.test('test.daniel@.com')).toBeFalsy();
  });
  it('should not be true when correct email provided', () => {
    const result = GetPattern('email');
    expect(result.test('test.danield.a')).toBeFalsy();
  });
});
