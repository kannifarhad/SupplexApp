import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from "@mui/material";
  
  type TableRowData = {
    value: React.ReactNode;
  } & React.ComponentProps<typeof TableCell>;
  
  interface TableTrProps {
    trData?: TableRowData[];
    colSpan?: number;
  }
  
  const TableTr: React.FC<TableTrProps> = ({ trData, colSpan }) => {
    return (
      <TableRow>
        {Array.isArray(trData) && trData.length > 0 ? (
          trData.map(({ value, ...rest }, i) => (
            <TableCell key={i} {...rest}>
              {value}
            </TableCell>
          ))
        ) : (
          <TableCell className="text-center" colSpan={colSpan}>
            No Records to show
          </TableCell>
        )}
      </TableRow>
    );
  };
  
  interface TableComponentProps {
    tableData: {
      header?: { title: React.ReactNode }[]; // Header row with column titles
      body?: TableRowData[][]; // Body rows, each containing an array of TableRowData
    } & React.ComponentProps<typeof Table>;
  }
  
  const TableComponent: React.FC<TableComponentProps> = ({ tableData }) => {
    const { header, body, ...rest } = tableData;
  
    return (
      <TableContainer component={Paper}>
        <Table {...rest} aria-label="simple table">
          {header && Array.isArray(header) && (
            <TableHead>
              <TableRow>
                {header.map(({ title, ...rest }, i) => (
                  <TableCell key={i} {...rest}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
  
          <TableBody>
            {Array.isArray(body) && body.length > 0 ? (
              body.map((data, i) => <TableTr key={i} trData={data} />)
            ) : (
              <TableTr colSpan={header?.length || 1} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default TableComponent;