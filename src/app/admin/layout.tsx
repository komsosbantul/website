import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  // If no user, redirect to login
  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8 md:py-12 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
