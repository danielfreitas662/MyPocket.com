import { Descriptions } from '@/components';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Descriptions', () => {
  it('should render label and children of the item', () => {
    render(
      <Descriptions>
        <Descriptions.Item label="label">children</Descriptions.Item>
      </Descriptions>
    );
    const descriptionItemLabelElement = screen.getByText('label');
    const descriptionItemChildrenElement = screen.getByText('children');
    expect(descriptionItemLabelElement).toBeInTheDocument();
    expect(descriptionItemChildrenElement).toBeInTheDocument();
  });
  it('should render two items', () => {
    render(
      <Descriptions>
        <Descriptions.Item label="label">children</Descriptions.Item>
        <Descriptions.Item label="label">children</Descriptions.Item>
      </Descriptions>
    );
    const descriptionItemLabelElement = screen.getAllByText('label');
    const descriptionItemChildrenElement = screen.getAllByText('children');
    expect(descriptionItemLabelElement.length).toBe(2);
    expect(descriptionItemChildrenElement.length).toBe(2);
  });
});
