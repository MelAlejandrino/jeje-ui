import { Header } from "@/components/header";
import { HomePage } from "@/features/home/page";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <HomePage />
    </div>
  );
}
