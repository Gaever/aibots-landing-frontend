interface FooterProps {
  text: string;
}

export function Footer({ text }: FooterProps) {
  return (
    <footer className="relative px-4 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-500 font-light">{text}</p>
      </div>
    </footer>
  );
}
