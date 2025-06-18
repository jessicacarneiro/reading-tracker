type LabelProps = {
  htmlFor: string;
  text: string;
  className?: string;
};

function Label({ htmlFor, text, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`}>
      {text}
    </label>
  );
}

export default Label;