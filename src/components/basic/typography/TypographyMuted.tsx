const TypographyMuted = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={`text-muted-foreground text-sm ${className}`} {...props}>
      {children}
    </p>
  );
};

export default TypographyMuted;
