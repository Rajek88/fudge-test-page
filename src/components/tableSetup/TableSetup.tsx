import React from "react";

interface TableRowProps {
  children: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <tr className="border-b border-gray-200">{children}</tr>;
};

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return <thead>{children}</thead>;
};

interface TableHeadProps {
  children: React.ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return <th className="px-4 py-2 text-left text-gray-600">{children}</th>;
};

interface TableCellProps {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return <td className="px-4 py-2 text-gray-600">{children}</td>;
};

interface TableBodyProps {
  children: React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
  return <table className="min-w-full">{children}</table>;
};

interface MyTableProps {
  columns: string[];
  rows: object[];
}

const TableSetup: React.FC<MyTableProps> = ({ columns, rows }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSetup;
