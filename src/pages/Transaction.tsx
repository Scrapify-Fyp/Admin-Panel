import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columnHelper = createColumnHelper<DataType>();

const columns = [
  columnHelper.accessor("user", {
    header: () => 'User',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("amount", {
    header: () => 'Amount',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("discount", {
    header: () => "Discount",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("quantity", {
    header: () => <span>Quantity</span>,
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: () => 'Status',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("action", {
    header: () => 'Action',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

function Transaction() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payments`);
        const payments = response.data;

        const formattedData = payments.data.map((payment: any) => ({
          user: payment.customer || "Unknown", // Adjust as needed
          amount: payment.amount / 100, // Stripe amounts are in cents
          discount: payment.discount || 0,
          quantity: 1, // Adjust as needed, Stripe doesn't directly provide quantity
          status: <span className={getStatusClass(payment.status)}>{payment.status}</span>,
          action: <Link to={`/admin/transaction/${payment.id}`}>Manage</Link>,
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'green';
      case 'processing':
        return 'red';
      case 'requires_payment_method':
        return 'purple';
      default:
        return 'grey';
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {TableHOC<DataType>(
          columns,
          data,
          "dashboard-product-box",
          "Products",
          true,
          loading
        )}
      </main>
    </div>
  );
}

export default Transaction;
