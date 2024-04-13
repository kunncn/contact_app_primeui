const ContainerComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string[];
}) => {
  const classNames = Array.isArray(className) ? className.join(" ") : "";
  return <div className={classNames}>{children}</div>;
};

export default ContainerComponent;
