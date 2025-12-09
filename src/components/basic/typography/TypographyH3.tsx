const TypographyH3 = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export default TypographyH3;
