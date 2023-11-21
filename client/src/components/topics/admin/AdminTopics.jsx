import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import './AdminTopics.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function AdminTopics(){
    const [open, setOpen] = useState(false);

    const [topicData, setTopicData] = useState([]); 
    console.log('topicData: ', topicData);


    useEffect(() => {
        fetch('/topics-all')
            .then(response => response.json())
            .then(data => {
                setTopicData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '60%',
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

      const handleDeleteTopic = () => {

      };


    return(
        <div className="admin-topics-container">
            <AdminMenu />
            <div className="admin-topics-elements">
                <h3>
                    Tematy:
                </h3>
                <div className="buttons-admin-topics">
                <input type="button" value="Sprawdź tematy" onClick={handleOpen}/>


                <input type="button" value="Dodaj tematy" />

                
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }} className='modal-content'>
                <h2>Tematy:</h2>

                <table>
                    <thead>
                    <tr>
                        <th className="schools-table-th">Nazwa przedmiotu</th>
                        <th className="schools-table-th">Nazwa szkoły</th>
                        <th className="schools-table-th">Nazwa klasy</th>
                        <th className="schools-table-th">Nauczyciel</th>
                        <th className="schools-table-th">Temat</th>
                        <th className="schools-table-th">Opis tematu</th>
                        <th className="schools-table-th">data</th>
                        <th className="schools-table-th"> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {topicData.map((topic) => (
                        <tr key={topic.topic_id}>
                            <td className="schools-table-td">{topic.subject_name}</td>
                            <td className="schools-table-td">{topic.school_name} {topic.town}</td>
                            <td className="schools-table-td">{topic.class_name}</td>
                            <td className="schools-table-td">{topic.first_name}{topic.second_name}</td>
                            <td className="schools-table-td">{topic.topic_text}</td>
                            <td className="schools-table-td">{topic.description}</td>
                            <td className="schools-table-td">{topic.date}</td>


                            <td className="schools-table-td">
                                {/* <button type="button" value="">Edytuj</button> */}
                                <button type="button" value="" onClick={() => handleDeleteTopic(topic.topic_id)}>Usuń</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>

                <Button onClick={handleClose}>Zamknij</Button>
                </Box>
                </Modal>
                </div>
            </div>
        </div>
    );
}