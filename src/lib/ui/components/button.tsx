import { cva, VariantProps } from 'class-variance-authority';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'iw-full rounded-xl flex flex-row justify-center items-center  p-3 shadow-lg shadow-slate-400',
  {
    variants: {
      variant: {
        default: 'bg-brand-primary',
        destructive: 'bg-complementary-danger',
        outline: 'border border-brand-primary bg-background-primary',
        secondary: 'bg-background-primary',
        ghost: 'bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-xl px-3',
        lg: 'h-14 rounded-xl px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonTextVariants = cva('font-bold', {
  variants: {
    variant: {
      default: 'text-background-primary',
      destructive: 'text-background-primary',
      outline: 'text-foreground-primary',
      secondary: 'text-background-primary',
      ghost: 'text-background-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  title?: string;
  titleStyle?: string;
  Left?: React.ComponentType<any>;
  Right?: React.ComponentType<any>;
}
const Button = ({
  onPress,
  children,
  variant,
  size,
  className,
  title,
  Left,
  Right,
  titleStyle,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      className={cn('', buttonVariants({ variant, size, className }))}
    >
      {Left && <Left />}
      <Text
        className={cn(buttonTextVariants({ variant, className: titleStyle }))}
      >
        {title}
      </Text>
      {Right && <Right />}
    </TouchableOpacity>
  );
};

export default Button;
