import { Feedback } from '@/components';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Feedback', () => {
  it('should render message', () => {
    render(<Feedback message="test" type="info" />);
    const messageElement = screen.getByText('test');
    expect(messageElement).toBeInTheDocument();
  });
  it('should have info class when type is info', () => {
    const { container } = render(<Feedback message="test" type="info" />);
    const elementWithInfoClass = container.getElementsByClassName('info');
    expect(elementWithInfoClass.length).toBe(1);
  });
  it('should have success class when type is success', () => {
    const { container } = render(<Feedback message="test" type="success" />);
    const elementWithSuccessClass = container.getElementsByClassName('success');
    expect(elementWithSuccessClass.length).toBe(1);
  });
  it('should have error class when type is error', () => {
    const { container } = render(<Feedback message="test" type="error" />);
    const elementWithErrorClass = container.getElementsByClassName('error');
    expect(elementWithErrorClass.length).toBe(1);
  });
  it('should not have dismissed class initially', () => {
    const { container } = render(<Feedback message="test" type="error" />);
    const elementWithErrorClass = container.getElementsByClassName('dismissed');
    expect(elementWithErrorClass.length).toBe(0);
  });
  it('should have dismissed class when click close button', () => {
    const { container } = render(<Feedback message="test" type="error" />);
    const dismissButton = container.getElementsByClassName('close');
    fireEvent.click(dismissButton[0]);
    const elementWithErrorClass = container.getElementsByClassName('dismissed');
    expect(elementWithErrorClass.length).toBe(1);
  });
});
