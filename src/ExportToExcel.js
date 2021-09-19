import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@material-ui/core";

export const ExportToExcel = ({ apiData, fileName, headers }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName, headers) => {
    let ws = XLSX.utils.json_to_sheet(apiData, { header: headers });
    //console.log("headers desde excel ",headers)
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      style={{ height: "5vh", right: "5vw", "&:hover": {backgroundColor: "green"}, top: "5vh", position: "absolute", zindex: 999, }}
      variant="contained"
      color="primary"
      onClick={(e) => exportToCSV(apiData, fileName, headers)}
    >
      Export to EXCEL
    </Button>
  );
};
