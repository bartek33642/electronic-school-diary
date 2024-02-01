import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { backendServer } from "../../../../config";

export function AdminModalRemarks() {
  const [remarkData, setRemarkData] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) {
      fetch(`${backendServer}/remarks-all-classes`)
        .then((response) => response.json())
        .then((data) => {
          setRemarkData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [open]);

  const handleDeleteRemark = (remarkId) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę uwagę?")) {
      console.log("Usuwanie uwagi o remarkId:", remarkId);

      fetch(`${backendServer}/remarks/${remarkId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            fetch(`${backendServer}/remarks-all-classes`)
              .then((response) => response.json())
              .then((data) => {
                setRemarkData(data);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.error("Błąd usuwania uwagi");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const columns = [
    { field: "remarkId", headerName: "ID", width: 80 },
    { field: "remark_text", headerName: "Treść uwagi", width: 190 },
    { field: "is_possitive", headerName: "Pozytywna?", width: 90 },
    { field: "date", headerName: "Data", width: 130 },
    { field: "student", headerName: "Uczeń", width: 150 },
    { field: "teacher", headerName: "Nauczyciel", width: 150 },
    { field: "school", headerName: "Szkoła", width: 180 },
    { field: "class", headerName: "Klasa", width: 90 },
    {
      field: "actions",
      headerName: " - ",
      width: 180,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => handleDeleteRemark(params.row.remarkId)}
        >
          Usuń
        </button>
      ),
    },
  ];
  const getIsPosstive = (is_possitive) => (is_possitive ? "Tak" : "Nie");

  const rows = remarkData.map((remark) => ({
    remarkId: remark.remark_id,
    remark_text: remark.remark_text,
    is_possitive: getIsPosstive(remark.is_possitive),
    date: new Date(remark.date).toLocaleDateString(),
    student: remark.student_first_name + " " + remark.student_second_name,
    teacher: remark.teacher_first_name + " " + remark.teacher_second_name,
    school: remark.school_name + " " + remark.town,
    class: remark.class_name,
    actions: (
      <button
        type="button"
        onClick={() => handleDeleteRemark(remark.remark_id)}
      >
        Usuń
      </button>
    ),
  }));

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.remarkId}
        pageSize={8}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 10]}
      />
    </div>
  );
}
