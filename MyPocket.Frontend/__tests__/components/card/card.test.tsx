import { Card } from '@/components';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Card', () => {
  it('should render children and title', () => {
    render(<Card title="Title">Test</Card>);
    const childrenElement = screen.getByText('Test');
    const titleElement = screen.getByText('Title');
    expect(childrenElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
