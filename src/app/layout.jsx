import "./globals.css";
import { DarkModeProvider } from "./context/DarkModeContext";

export const metadata = {
  title: "Todolist App",
  description: "Async + DarkMode + Redux",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
