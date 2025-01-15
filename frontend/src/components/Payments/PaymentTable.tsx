import React from "react";

interface PaymentData {
  id: string;
  student: string;
  course: string;
  date: string;
  amount: number;
}

interface PaymentTableProps {
  data: PaymentData[];
}

const PaymentTable = ({ data }: PaymentTableProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((payment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.student}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${payment.amount}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
