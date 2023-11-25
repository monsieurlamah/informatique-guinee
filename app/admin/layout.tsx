import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title:
    "Informatique & Iphone Guinée Admin | Votre avenir numérique commence ici",
  description:
    "Informatique & Iphone Guinée Admin Dashboard | Votre avenir numérique commence ici",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
