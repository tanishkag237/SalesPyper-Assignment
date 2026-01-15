import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ headers, children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border">
      <thead className="bg-gray-800">
        <tr>
          {headers.map(h => (
            <th key={h} className="px-4 py-2 text-left border-b font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);