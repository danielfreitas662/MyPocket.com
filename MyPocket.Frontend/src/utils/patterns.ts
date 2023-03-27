export const GetPattern = (type: 'email' | 'usphone' | undefined) => {
  switch (type) {
    case 'email':
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    case 'usphone':
      return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    default:
      return /./g;
  }
};
