import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components';
import OutterButton from '../../../testFixtures/button/buttonMock';

describe('Button', () => {
  it('should render component children', () => {
    render(<Button>Test</Button>);
    const buttonElement = screen.getByRole('button', {
      name: /Test/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });
  it('should render component icon', () => {
    render(<Button icon="Test" />);
    const buttonElement = screen.getByText('Test');
    expect(buttonElement).toBeInTheDocument();
  });
  it('should trigger button onClick when click on div wrapper', () => {
    const { container } = render(<OutterButton />);
    const buttonDivElement = container.getElementsByClassName('button')[0];
    expect(buttonDivElement).toBeInTheDocument();
    fireEvent.click(buttonDivElement);
    const newChildren = screen.getByText('Done');
    expect(newChildren).toBeInTheDocument();
  });
  it('should trigger button onClick when click on button element', () => {
    render(<OutterButton />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    const newChildren = screen.getByText('Done');
    expect(newChildren).toBeInTheDocument();
  });
  it('should have primary class theme as default', () => {
    const { container } = render(<Button />);
    const buttonElement = container.getElementsByClassName('primary');
    expect(buttonElement.length).toBe(1);
  });
  it('should have secondary class theme is specified', () => {
    const { container } = render(<Button theme="secondary" />);
    const buttonElement = container.getElementsByClassName('secondary');
    expect(buttonElement.length).toBe(1);
  });
});
