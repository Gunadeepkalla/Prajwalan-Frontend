import OfficerSidebar from "./OfficerSidebar";

export default function OfficerLayout({ children }: any) {
  return (
    <div className="flex">
      <OfficerSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-[#0B1120] text-white p-10">
        {children}
      </div>
    </div>
  );
}