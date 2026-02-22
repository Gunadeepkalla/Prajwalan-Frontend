import CitizenSidebar from "./CitzenSidebar";

export default function CitizenLayout({ children }: any) {
  return (
    <div className="flex">
      <CitizenSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-[#F8FAFC] p-10">
        {children}
      </div>
    </div>
  );
}