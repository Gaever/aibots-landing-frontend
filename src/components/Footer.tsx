interface FooterProps {
  text: string;
}

export function Footer({ text }: FooterProps) {
  return (
    <footer className="relative px-4 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2 text-center text-sm text-gray-500 font-light">
        <a href="/personal-data" className="hover:text-gray-700 underline-offset-4 hover:underline">
          Политика обработки персональных данных
        </a>
      </div>
    </footer>
  );
}
