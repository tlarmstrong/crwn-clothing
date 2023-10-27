
// ... = spread in
// {`${...}`} = string interpolated string

import { 
  Group, 
  FormInputBox, 
  FormInputLabel, 
  FormInputLabelShrink 
} from './form-input.styles';

const FormInput = ({ label, inputOptions }) => {
  const InputLabel = inputOptions.value.length ? FormInputLabelShrink : FormInputLabel;

  return (
    <Group>
      <FormInputBox {...inputOptions} id={inputOptions.name} />
      {label && (<InputLabel htmlFor={inputOptions.name}>{ label }</InputLabel>)}
    </Group>
  );
}

export default FormInput;
