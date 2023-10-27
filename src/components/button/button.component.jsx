
import {
  BaseButton,
  GoogleButton,
  InvertedButton
} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  google: 'google',
  inverted: 'inverted',
  base: 'base'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
  {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType]
);

const Button = ({ displayText, buttonType, options }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton{...options}>{ displayText }</CustomButton>
  );
}

export default Button;
