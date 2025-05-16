import { ProductProvider } from "../contexts/ProductContext.jsx";
import DashboardInner from "./DashboardInner.jsx";
import "../styles/Dashboard.css"

export default function Dashboard() {
  return (
    <ProductProvider>
      <DashboardInner />
    </ProductProvider>
  );
}
