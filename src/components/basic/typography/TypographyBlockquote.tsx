const TypographyBlockquote = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <blockquote
      className={`mt-6 border-l-2 pl-6 italic ${className}`}
      {...props}
    >
      {children}
    </blockquote>
  );
};

export default TypographyBlockquote;
