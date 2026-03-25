import Header from "./Header";
import Sidebar from "./Sidebar";
import CommandBar from "./CommandBar";

interface AppLayoutProps {
  children: React.ReactNode;
  activeItem?: string;
}

export default function AppLayout({
  children,
  activeItem = "input-terminal",
}: AppLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar activeItem={activeItem} />
        <main className="flex-1 flex overflow-hidden">{children}</main>
      </div>
      <CommandBar />
    </>
  );
}
