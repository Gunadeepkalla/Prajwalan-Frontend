import OfficerSidebar from "./OfficerSidebar";

export default function OfficerLayout({ children }: any) {
  return (
    <div className="flex">
      <OfficerSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-[#F1F5F9] text-[#0F172A] p-10">
        {children}
      </div>
    </div>
  );
}