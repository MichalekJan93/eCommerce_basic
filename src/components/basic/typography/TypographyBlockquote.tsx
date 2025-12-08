const TypographyBlockquote = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
      {children}
    </blockquote>
  );
};

export default TypographyBlockquote;
