type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url';

type InputProps = {
  id?: string;
  name?: string;
  type: InputType;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  required?: boolean;
  className?: string;
};

function Input({
  id,
  name,
  type,
  value,
  onChange,
  min,
  required,
  className = '',
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      required={required}
      className={`form-control ${className}`.trim()}
    />
  );
}

export default Input;