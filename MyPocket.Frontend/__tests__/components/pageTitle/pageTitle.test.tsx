import { PageTitle } from '@/components';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

const routerBackFn = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PageTitle', () => {
  it('should render children', () => {
    render(<PageTitle>Test</PageTitle>);
    const childrenElement = screen.getByText('Test');
    expect(childrenElement).toBeInTheDocument();
  });
  it('should call router back function when back button is clicked', () => {
    const mockedRouterBack = jest.mocked(useRouter);
    mockedRouterBack.mockImplementation(() => ({
      back: routerBackFn,
      forward: jest.fn(),
      refresh: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }));
    const { container } = render(<PageTitle extra={<button>testButton</button>}>Test</PageTitle>);
    const backButton = container.getElementsByClassName('backButton');
    expect(backButton[0]).toBeInTheDocument();
    fireEvent.click(backButton[0]);
    expect(routerBackFn).toBeCalled();
  });
});
