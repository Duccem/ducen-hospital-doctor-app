import { cva, VariantProps } from 'class-variance-authority';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-brand-primary',
        destructive: 'bg-complementary-danger',
        outline: 'border border-brand-primary bg-background-primary',
        secondary: 'bg-brand-secondary',
        ghost: 'bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
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
  title: string;
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
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      className={cn(
        'w-full rounded-full flex flex-row justify-center items-center  p-3',
        buttonVariants({ variant, size, className }),
      )}
    >
      {Left && <Left />}
      <Text className={cn(buttonTextVariants({ variant, className }))}>
        {title}
      </Text>
      {Right && <Right />}
    </TouchableOpacity>
  );
};

export default Button;
