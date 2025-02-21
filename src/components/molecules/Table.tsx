import React from "react";

interface TableProps {
  headers: string[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="border px-4 py-2 bg-gray-100 text-left text-sm font-semibold"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
