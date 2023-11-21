import { useState, forwardRef, useImperativeHandle } from 'react';
import EntryForm from "./EntryForm";
import { EntryWithoutId } from '../../types';
import Box from '@mui/system/Box';
import { Button } from '@mui/material';

interface TogglableProps {
  buttonLabel: string;
  onSubmit: (values: EntryWithoutId, patientId: string ) => void;
  patientId: string;
  errorMessage: string;
  allDiagnosesCodes: string[];
}
export type ToggleVisibilityRef = {
  toggleVisibility: () => void;
};

const Togglable = forwardRef<ToggleVisibilityRef, TogglableProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility() {
      setVisible(!visible);
    },
  }));
  
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained" color="inherit">{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <EntryForm 
            visible={visible}
            toggleVisibility={toggleVisibility}
            onSubmit={props.onSubmit}
            patientId={props.patientId}
            allDiagnosesCodes={props.allDiagnosesCodes}
          />
        </Box>
      </div>
    </div>
  );
});

export default Togglable;