import React, { useState, useEffect } from "react";
import { backendServer } from "../../config";
import "./Notifcation.css";
import { format } from 'date-fns';

export function Notification() {
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userEmail = localStorage.getItem("userEmail");

                if (userEmail) {
                    const userQuery = `${backendServer}/users-school-student/${userEmail}`;
                    const result = await fetch(userQuery);
                    const userData = await result.json();
                    console.log("userData: ", userData);

                    if (result.ok && userData.length > 0) {
                        const studentId = userData[0].student_id;

                        const userMarksQuery = `${backendServer}/marks/${studentId}`;
                        const userMarksResult = await fetch(userMarksQuery);
                        const userMarksData = await userMarksResult.json();
                        console.log("userMarksData: ", userMarksData);

                        if (userMarksResult.ok) {
                            const currentDate = new Date().setHours(0, 0, 0, 0); // Ustaw godzinę na 00:00:00
                            const todayMarks = userMarksData.filter(mark => new Date(mark.date).setHours(0, 0, 0, 0) === currentDate);

                            if (todayMarks.length > 0) {
                                const notifications = todayMarks.map(mark => {
                                    return {
                                        date: format(new Date(mark.date), 'dd-MM-yyyy'),  // Formatuj datę
                                        message: `Dziś została dodana ocena ${mark.grade_value} z przedmiotu ${mark.subject_name}`
                                    };
                                });

                                setNotification(notifications);
                            } else {
                                setNotification([]); // Jeśli brak ocen, wyczyść powiadomienia
                            }
                        } else {
                            setError("Błąd pobierania danych ocen.");
                        }
                    } else {
                        setError("Błąd pobierania danych użytkownika: brak danych.");
                    }
                } else {
                    setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
                }
            } catch (error) {
                console.error(error);
                setError("Wystąpił błąd podczas pobierania danych użytkownika.");
            }
        };

        // Pobieraj dane co 60 sekund
        const intervalId = setInterval(() => {
            fetchUserData();
        }, 40000);

        // Wywołanie fetchUserData na starcie komponentu
        fetchUserData();

        // Wyczyszczenie interwału po zakończeniu życia komponentu
        return () => clearInterval(intervalId);
    }, [forceUpdate]);

    return (
        <div className="notification-container">
            <div className="notification-elements">
                {notification.length > 0 ? (
                    <table className="notification-table">
                        <thead className="notification-thead">
                            <th className="notification-th">Data</th>
                            <th className="notification-th">Komunikat</th>
                        </thead>
                        <tbody>
                            {notification.map((item, index) => (
                                <tr key={index}>
                                    <td className="notification-td">{item.date}</td>
                                    <td className="notification-td">{item.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Brak powiadomień</p>
                )}
            </div>
        </div>
    );
}
