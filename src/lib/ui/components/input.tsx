import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { cn } from '../utils/cn';

interface InputFieldProps extends TextInputProps {
  label?: string;
  Icon?: React.ComponentType<any>;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

export const Input = ({
  label,
  labelStyle,
  Icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text
              className={cn('text-lg font-JakartaSemiBold mb-3', labelStyle)}
            >
              {label}
            </Text>
          )}
          <View
            className={cn(
              'flex flex-row justify-start items-center relative bg-background-primary rounded-lg border border-brand-primary',
              containerStyle,
            )}
          >
            {Icon && (
              <View
                className={cn(
                  'w-6 h-6 justify-center items-center p-2 ml-2',
                  iconStyle,
                )}
              >
                <Icon />
              </View>
            )}
            <TextInput
              className={cn(
                'rounded-full p-2 font-JakartaSemiBold text-[15px] flex-1',
                inputStyle,
              )}
              cursorColor={'#000'}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
