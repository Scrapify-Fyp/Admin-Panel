import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = () => (
  <div style={{display:"flex",justifyContent:"center",marginTop:"200px"}}>
    <Spinner animation="border" role="status">
      <span className="sr-only"></span>
    </Spinner>
  </div>
);
function TableHOC<T>(
  columns: ColumnDef<T, any>[],
  InputData: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false,
  loading: boolean = true 
) {
  const [data, setData] = React.useState<T[]>(InputData);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Update data when InputData changes
  React.useEffect(() => {
    setData(InputData);
  }, [InputData]);

  // console.log("Data:", data);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {loading ? ( // Conditionally render spinner when loading is true
        <SpinnerComponent/>
      ) : (
        <div className={containerClassname}>
          <h2 className="heading">{heading}</h2>
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {showPagination && (
            <>
              <div className="table-pagination">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </button>
              </div>
              <span>
                Page{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span>
                | Go to page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    table.setPageIndex(page);
                  }}
                />
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <div>{table.getRowModel().rows.length} Rows</div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default TableHOC;
