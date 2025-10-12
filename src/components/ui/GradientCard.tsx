import React, { ReactNode } from 'react';

interface GradientCardProps {
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  gradient?: string;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  borderEffect?: boolean;
}

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  children,
  icon,
  gradient = 'from-green-500/10 to-emerald-500/5',
  className = '',
  onClick,
  hoverEffect = true,
  borderEffect = true,
}) => {
  return (
    <div 
      className={`
        rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} 
        ${borderEffect ? 'border border-white/10 dark:border-deep-ash-lighter' : ''}
        ${hoverEffect ? 'hover:shadow-premium hover:shadow-green-glow/10 hover:translate-y-[-2px]' : ''}
        transition-all duration-300 ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && (
        <div className="px-5 py-3 flex items-center justify-between border-b border-white/5 dark:border-deep-ash-lighter">
          <h3 className="font-medium flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default GradientCard;