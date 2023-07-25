import React from "react";
import './AdminDasboard.css';
import { Menu } from "../../menu/Menu";

export function AdminDashboard(){
    return(        
        <div>
            <Menu />         
        <div>
            <h1>Admin dashboard</h1>
            <div className="content-admin">
                <button className="button-box">{/* 1 */}
                    <div className="box">
                    <div className="box-icon">
                        <img src="https://img.icons8.com/?size=512&id=23264&format=png" alt="user"/>
                    </div>
                    <div className="box-title">
                        <h3>Użytkownicy</h3>
                    </div>
                </div>
                </button>

                <button className="button-box">{/* 2 */}
                <div className="box">
                    <div className="box-icon">
                        <img src="https://img.icons8.com/?size=512&id=23264&format=png" alt="user"/>
                    </div>
                    <div className="box-title">
                        <h3>Ustawienia</h3>
                    </div>
                </div>
                </button>

                <button className="button-box">{/* 3 */}
                <div className="box">
                    <div className="box-icon">
                        <img src="https://img.icons8.com/?size=512&id=23264&format=png" alt="user"/>
                    </div>
                    <div className="box-title">
                        <h3>Narzędzia</h3>
                    </div>
                </div>
                </button>

                <button className="button-box">{/* 4 */}
                <div className="box">
                    <div className="box-icon">
                        <img src="https://img.icons8.com/?size=512&id=23264&format=png" alt="user"/>
                    </div>
                    <div className="box-title">
                        <h3>Lalal</h3>
                    </div>
                </div>
                </button>

                <button className="button-box">{/* 5 */}
                <div className="box">
                    <div className="box-icon">
                        <img src="https://img.icons8.com/?size=512&id=23264&format=png" alt="user"/>
                    </div>
                    <div className="box-title">
                        <h3>BlaBalBla</h3>
                    </div>
                </div>
                </button>

                <button className="button-box">{/* 6 */}
                <div className="box">
                    <div className="box-icon">
                        <img src="https://img.icons8.com/?size=512&id=23264&format=png" alt="user"/>
                    </div>
                    <div className="box-title">
                        <h3>Gadagada</h3>
                    </div>
                </div>
                </button>

            </div>
        </div>
        </div>

    );
}