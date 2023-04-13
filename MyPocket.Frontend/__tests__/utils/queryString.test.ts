import { objectToQueryString } from '@/utils/queryString';
import '@testing-library/jest-dom';

describe('objectToQueryString', () => {
  it('should return query string', () => {
    const testObject = {
      test1: 1,
      test2: 2,
    };
    const result = objectToQueryString(testObject);
    expect(result).toBe('test1=1&test2=2');
  });
  it('should return query string bypassing null property', () => {
    const testObject = {
      test1: 1,
      test2: 2,
      test3: null,
    };
    const result = objectToQueryString(testObject);
    expect(result).toBe('test1=1&test2=2');
  });
  it('should return query string bypassing empty string property', () => {
    const testObject = {
      test1: 1,
      test2: 2,
      test3: '',
    };
    const result = objectToQueryString(testObject);
    expect(result).toBe('test1=1&test2=2');
  });
  it('should return query string not bypassing 0 value property', () => {
    const testObject = {
      test1: 1,
      test2: 2,
      test3: 0,
    };
    const result = objectToQueryString(testObject);
    expect(result).toBe('test1=1&test2=2&test3=0');
  });
});
