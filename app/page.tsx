import Input from "@/components/input";
import { badges } from "@/constants";


export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-3 lg:p-5 flex items-center justify-center">
      <main className="bg-gradient-to-r from-[#e4f7ff] to-[#f3e8ff] shadow rounded-md h-[95vh] lg:h-[90vh] w-full p-2">
        <div className="pt-20 flex flex-col items-center justify-center gap-5">
          <h1 className="font-medium text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#582aff] to-[#8e72f6]">Discover the root word of every word.</h1>
          <Input />
        </div>
      </main>
    </div>
  );
}
