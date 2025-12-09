const TypographyP = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={`leading-7 not-first:mt-6 ${className}`} {...props}>
      {children}
    </p>
  );
};

export default TypographyP;
