import React, { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  gradient?: string;
  hoverGradient?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = 'button',
  gradient,
  hoverGradient,
}) => {
  // Define variant styles
  const variantStyles = {
    primary: {
      base: gradient || 'bg-gradient-to-r from-green-500 to-emerald-500',
      hover: hoverGradient || 'hover:from-green-600 hover:to-emerald-600',
      text: 'text-white',
      border: 'border-transparent',
      shadow: 'shadow-green-glow',
    },
    secondary: {
      base: gradient || 'bg-gradient-to-r from-slate-100 to-slate-200 dark:from-deep-ash-light dark:to-deep-ash-lighter',
      hover: hoverGradient || 'hover:from-slate-200 hover:to-slate-300 dark:hover:from-deep-ash-lighter dark:hover:to-deep-ash-light',
      text: 'text-slate-800 dark:text-white',
      border: 'border-transparent',
      shadow: 'shadow-premium',
    },
    outline: {
      base: 'bg-transparent',
      hover: hoverGradient || 'hover:bg-green-500/5',
      text: 'text-green-500',
      border: 'border border-green-500/50 dark:border-green-500/30',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent',
      hover: hoverGradient || 'hover:bg-slate-100 dark:hover:bg-deep-ash-light',
      text: 'text-slate-800 dark:text-slate-200',
      border: 'border-transparent',
      shadow: '',
    },
  };

  // Define size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
  };

  // Apply disabled styles
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'transform active:scale-[0.98] transition-transform';

  // Apply width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant].base}
        ${variantStyles[variant].hover}
        ${variantStyles[variant].text}
        ${variantStyles[variant].border}
        ${variantStyles[variant].shadow}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${widthStyles}
        font-medium flex items-center justify-center transition-all duration-200
        ${className}
      `}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default GradientButton;