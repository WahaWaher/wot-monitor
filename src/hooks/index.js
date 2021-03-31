import { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

export const useTheme = () => useContext(ThemeContext);

export const useToggle = (val) => {
  const [on, setOn] = useState(val);

  return {
    on,
    toggle: () => setOn(!on),
  };
};

export const useInput = (val) => {
  const [value, setValue] = useState(val);

  return {
    value,
    setValue: (newValue) => setValue(newValue),
  };
};
