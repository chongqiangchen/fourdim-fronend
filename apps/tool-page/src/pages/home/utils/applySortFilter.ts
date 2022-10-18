function applySortFilter(
  {
    tableData,
    comparator,
    filterName,
    filterToken
  }: {
    tableData: any[];
    comparator: (a: any, b: any) => number;
    filterName: string;
    filterToken: string;
  }
) {
  const stabilizedThis = tableData
    .filter(el => el.amount && Number(el.amount) > 0)
    .map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  //
  // if (filterStatus !== "all") {
  //   tableData = tableData.filter((item: Record<string, any>) => item.status === filterStatus);
  // }
  //
  if (filterToken !== "all") {
    tableData = tableData.filter((item: Record<string, any>) => item.token.toLowerCase() === filterToken.toLowerCase());
  }

  return tableData;
}

export default applySortFilter;