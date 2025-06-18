function Button({ title, href }: { title: string, href: string }) {
  return (
    <button><a href={href}>{title}</a></button>
  );
}

export default Button;