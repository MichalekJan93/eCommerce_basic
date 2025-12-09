const TypographySmall = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <small
      className={`text-sm leading-none font-medium ${className}`}
      {...props}
    >
      {children}
    </small>
  );
};

export default TypographySmall;
