'use client';

import Button from '../button/button';
import Form from '../form/form';
import Select from '../inputComponents/select/select';
import TextInput from '../inputComponents/textinput/textInput';

function CategoryForm() {
  return (
    <div style={{ width: 500 }}>
      <Form.Item label="Name" name="id" hidden>
        <TextInput />
      </Form.Item>
      <Form.Item label="Name" name="name" required>
        <TextInput />
      </Form.Item>
      <Form.Item label="Type" name="type" required>
        <Select
          allowClear
          placeholder="Category type..."
          options={[
            { value: 0, label: 'Outcome' },
            { value: 1, label: 'Income' },
          ]}
        />
      </Form.Item>
      <Button type="submit">Save</Button>
    </div>
  );
}
export default CategoryForm;
