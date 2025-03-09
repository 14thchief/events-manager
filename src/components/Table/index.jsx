import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  ArrowDownHi,
  ArrowUpHi,
  ArrowsExchangeV,
} from "../../assets/icons/icons";
import TableFooter from "./TableFooter";
import SuspenseElement from "../SuspenseElement";
import EmptyData from "../EmptyData";
import styles from "./_styles.module.scss";
import { getColumnsWithHeader, getServerPagination } from "./data";

const Table = ({
  data,
  columns,
  loading,
  useHeader = true,
  headerTitle,
  tableProps,
  countText,
  selectable = false, // Enable row selection when true
  onSelectionChange, // Custom on-change handler receiving array of selected row values
}) => {
  const tableData = useMemo(() => data, [data]);
  const baseColumns = useMemo(() => columns, [columns]);

  // If selectable, prepend a column for selection checkboxes.
  const finalColumns = useMemo(() => {
    if (selectable) {
      const selectionColumn = {
        id: "select",
        enableSorting: false, // Disable sorting on the selection column.
        header: ({ table }) => (
          <input
            type="checkbox"
            onChange={table.getToggleAllRowsSelectedHandler()}
            checked={table.getIsAllRowsSelected()}
            // Use header-checkbox class to adjust size/alignment.
            className={`${styles["checkbox-custom"]} header-checkbox`}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            onChange={row.getToggleSelectedHandler()}
            checked={row.getIsSelected()}
            className={`${styles["checkbox-custom"]}`}
          />
        ),
        size: 40,
      };
      return [selectionColumn, ...baseColumns];
    }
    return baseColumns;
  }, [selectable, baseColumns]);

  const {
    search,
    columnFilter,
    columnVisibility,
    isPaginated,
    serverPagination,
    isSorted = true,
    sortedColumns,
  } = tableProps || {};

  const [sorting, setSorting] = useState([]);
  // Manage row selection state only if selectable.
  const [rowSelection, setRowSelection] = useState({});

  const tableState = columnFilter
    ? {
        sorting,
        columnFilters: columnFilter || [],
        columnVisibility,
        ...(selectable && { rowSelection }),
      }
    : {
        sorting,
        globalFilter: search,
        columnVisibility,
        ...(selectable && { rowSelection }),
      };

  const totalData =
    isPaginated === "server" ? serverPagination.totalData : data.length;

  const tableInstance = useReactTable({
    data: tableData,
    columns: useHeader
      ? getColumnsWithHeader({
          columns: finalColumns,
          totalData,
          headerTitle,
          countText,
        })
      : finalColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: isPaginated === "server",
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    // Only handle row selection changes when selectable is enabled.
    onRowSelectionChange: selectable ? setRowSelection : undefined,
    state: tableState,
  });

  // Report overall selected rows via onSelectionChange.
  useEffect(() => {
    if (selectable && onSelectionChange) {
      const selectedRows = tableInstance
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, tableInstance, selectable, onSelectionChange]);

  const {
    getHeaderGroups,
    getRowModel,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
    getPageCount,
    getState,
  } = tableInstance;

  const {
    pagination: { pageIndex, pageSize },
  } = getState();

  const {
    getCanPreviousPageServer,
    getCanNextPageServer,
    previousPageServer,
    nextPageServer,
    setPageIndexServer,
    pageIndexServer,
    pageSizeServer,
    setPageSizeServer,
    getPageCountServer,
  } = getServerPagination({ isPaginated, serverPagination });

  const isDataAvailable = !!tableInstance.getRowModel().rows.length;

  return (
    <div className={styles.table_wrapper}>
      <div className={styles.table_header_body_wrapper}>
        {loading ? (
          <div className={styles.suspenseWrapper}>
            <SuspenseElement />
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              {getHeaderGroups().map((headerEl, index) => {
                const isTitleHeader =
                  headerEl.headers[index].column.id === "Title";
                return (
                  <tr
                    key={headerEl.id}
                    className={
                      isTitleHeader ? styles.header_title : styles.header_row
                    }
                  >
                    {headerEl.headers.map((columnEl) => {
                      const sortOrder = columnEl.column.getIsSorted();
                      const sortIcon =
                        sortOrder === "asc" ? (
                          <ArrowUpHi size={16} />
                        ) : sortOrder === "desc" ? (
                          <ArrowDownHi size={16} />
                        ) : (
                          <ArrowsExchangeV size={16} />
                        );

                      const isColumnSorted = sortedColumns?.length
                        ? isSorted &&
                          columnEl.column.columnDef.enableSorting !== false &&
                          sortedColumns.includes(columnEl.column.id)
                        : isSorted &&
                          columnEl.column.columnDef.enableSorting !== false;
                      return (
                        <th key={columnEl.id} colSpan={columnEl.colSpan}>
                          <div className={styles[columnEl.column.id]}>
                            {columnEl.isPlaceholder
                              ? null
                              : flexRender(
                                  columnEl.column.columnDef.header,
                                  columnEl.getContext()
                                )}
                            {isColumnSorted && (
                              <span
                                onClick={columnEl.column.getToggleSortingHandler()}
                              >
                                {sortIcon}
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            {isDataAvailable && (
              <tbody>
                {getRowModel().rows.map((rowEl) => (
                  <tr key={rowEl.id} className={styles.body_row}>
                    {rowEl.getVisibleCells().map((cellEl) => (
                      <td key={cellEl.id} className={styles[cellEl.column.id]}>
                        <span>
                          {flexRender(
                            cellEl.column.columnDef.cell,
                            cellEl.getContext()
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
      {isDataAvailable && isPaginated && (
        <TableFooter
          getCanPreviousPage={getCanPreviousPageServer || getCanPreviousPage}
          getCanNextPage={getCanNextPageServer || getCanNextPage}
          previousPage={previousPageServer || previousPage}
          nextPage={nextPageServer || nextPage}
          setPageIndex={setPageIndexServer || setPageIndex}
          pageIndex={pageIndexServer || pageIndex}
          setPageSize={setPageSizeServer || setPageSize}
          pageSize={pageSizeServer || pageSize}
          getPageCount={getPageCountServer || getPageCount}
        />
      )}
      {!isDataAvailable && !loading && (
        <div className={styles.empty_data}>
          <EmptyData />
        </div>
      )}
    </div>
  );
};

export default Table;
