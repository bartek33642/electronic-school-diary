import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import "./AdminTopics.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { backendServer } from "../../../config";

export function AdminTopics() {
  const [open, setOpen] = useState(false);

  const [topicData, setTopicData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [schoolId, setSchoolId] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [classId, setClassId] = useState("");

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    fetch(`${backendServer}/topics-all`)
      .then((response) => response.json())
      .then((data) => {
        setTopicData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${backendServer}/schools`)
      .then((response) => response.json())
      .then((data) => {
        setSchoolData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      fetch(`${backendServer}/classes/${selectedSchool}`)
        .then((response) => response.json())
        .then((data) => {
          setClassData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedSchool]);

  useEffect(() => {
    fetch(`${backendServer}/classes`)
      .then((response) => response.json())
      .then((data) => {
        setClassData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      fetch(`${backendServer}/all-teachers/${selectedSchool}`)
        .then((response) => response.json())
        .then((data) => {
          setTeacherData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedClass) {
      fetch(`${backendServer}/subjects/class/${parseInt(selectedClass, 10)}`)
        .then((response) => response.json())
        .then((data) => {
          setSubjectData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedClass]);

  const setTest = (data) => {
    setNewTopic(data);
  };

  const [newTopic, setNewTopic] = useState({
    teacher_id: "",
    class_id: "",
    topic_text: "",
    description: "",
    date: "",
    subject_id: "",
    school_id: "",
  });

  const handleAddTopic = async () => {
    const updatedTopic = newTopic;

    const newTopicWithNumbers = {
      ...updatedTopic,
      teacher_id: parseInt(selectedTeacher, 10) || null,
      class_id: parseInt(selectedClass, 10) || null,
      subject_id: parseInt(updatedTopic.subject_id, 10) || null,
      school_id: parseInt(selectedSchool, 10) || null,
    };

    setNewTopic(newTopicWithNumbers);

    fetch(`${backendServer}/add-topic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTopicWithNumbers),
    })
      .then((response) => {
        if (response.status === 201) {
          fetch("/topics-all")
            .then((response) => response.json())
            .then((data) => {
              setTopicData(data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.error("Błąd dodawania tematu");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTopic = (topicId) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę temat?")) {
      fetch(`${backendServer}/topics/${topicId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            fetch(`${backendServer}/topics`)
              .then((response) => response.json())
              .then((data) => {
                setTopicData(data);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.error("Błąd usuwania klasy");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const columns = [
    { field: "topicId", headerName: "ID", width: 100 },
    { field: "subject_name", headerName: "Przedmiot", width: 130 },
    { field: "school_name", headerName: "Nazwa szkoły", width: 130 },
    { field: "class_name", headerName: "Nazwa klasy", width: 130 },
    { field: "name", headerName: "Nauczyciel", width: 130 },
    { field: "topic_text", headerName: "Temat", width: 130 },
    { field: "description", headerName: "Opis", width: 130 },
    { field: "date", headerName: "Data ", width: 130 },
    {
      field: "actions",
      headerName: " - ",
      width: 180,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => handleDeleteTopic(params.row.topicId)}
        >
          Usuń
        </button>
      ),
    },
  ];

  const rows = topicData.map((topic) => ({
    topicId: topic.topic_id,
    subject_name: topic.subject_name,
    school_name: topic.school_name,
    class_name: topic.class_name,
    name: topic.first_name + " " + topic.second_name,
    topic_text: topic.topic_text,
    description: topic.description,
    date: new Date(topic.date).toLocaleDateString(),
    actions: (
      <button type="button" onClick={() => handleDeleteTopic(topic.topic_id)}>
        Usuń
      </button>
    ),
  }));

  return (
    <div className="admin-topics-container">
      <AdminMenu />
      <div className="admin-topics-elements">
        <h3>Tematy:</h3>
        <div className="buttons-admin-topics">
          <input type="button" value="Sprawdź tematy" onClick={handleOpen} />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style }} className="modal-content">
              <h2>Tematy:</h2>

              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.topicId}
                  pageSize={8}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 7 },
                    },
                  }}
                  pageSizeOptions={[7, 10]}
                />
              </div>

              <Button onClick={handleClose}>Zamknij</Button>
            </Box>
          </Modal>
        </div>

        <h3>Dodaj tematy: </h3>
        <div className="admin-topics-add-topic">
          <select
            name="add_topic_school"
            id=""
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              setSelectedClass("");
              setSelectedTeacher("");
            }}
          >
            <option value="select_school">Wybierz szkołę</option>
            {schoolData.map((school) => (
              <option key={school.school_id} value={school.school_id}>
                {`${school.school_name} ${school.town}`}
              </option>
            ))}
          </select>
          {selectedSchool && (
            <select
              name="add_topic_class"
              id=""
              onChange={(e) => {
                setSelectedClass(parseInt(e.target.value, 10));
                setSelectedTeacher("");
              }}
            >
              <option value="select_class">Wybierz klasę</option>
              {classData
                .filter(
                  (classes) => classes.school_id === parseInt(selectedSchool)
                )
                .map((classes) => (
                  <option key={classes.class_id} value={classes.class_id}>
                    {`${classes.class_name}`}
                  </option>
                ))}
            </select>
          )}
          {selectedSchool && selectedClass && teacherData.length > 0 && (
            <select
              name="add_topic_teacher"
              id=""
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="select_teacher">Wybierz nauczyciela</option>
              {teacherData.map((teacher) => (
                <option key={teacher.teacher_id} value={teacher.teacher_id}>
                  {`${teacher.first_name} ${teacher.second_name}`}
                </option>
              ))}
            </select>
          )}
          {selectedSchool && selectedClass && selectedTeacher && (
            <select
              name="add_topic_subject"
              id=""
              onChange={(e) =>
                setTest({ ...newTopic, subject_id: e.target.value })
              }
            >
              <option value="select_subject">Wybierz przedmiot</option>
              {subjectData.map((subject) => (
                <option key={subject.subject_id} value={subject.subject_id}>
                  {`${subject.subject_name}`}
                </option>
              ))}
            </select>
          )}
          Temat:{" "}
          <input
            type="text"
            onChange={(e) =>
              setTest({ ...newTopic, topic_text: e.target.value })
            }
          />
          Opis:{" "}
          <textarea
            name="description"
            id=""
            cols="60"
            rows="5"
            onChange={(e) =>
              setTest({ ...newTopic, description: e.target.value })
            }
          ></textarea>
          Data:{" "}
          <input
            type="date"
            onChange={(e) => setTest({ ...newTopic, date: e.target.value })}
          />
          <input type="button" value="Dodaj temat" onClick={handleAddTopic} />
        </div>
      </div>
    </div>
  );
}
