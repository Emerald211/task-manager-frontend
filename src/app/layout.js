import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/context/Authcontext";
import { TaskProvider } from "@/context/Taskcontext";


export const metadata = {
  title: "Task Manager",
  description: "Minimalist black & white task manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans">
        <AuthProvider>
          <TaskProvider>
            <Navbar />
            <main className="max-w-2xl mx-auto ">{children}</main>
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
