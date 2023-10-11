import React from "react";
import './AdminDasboard.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
export function AdminDashboard(){

    return(        
        <div className="dashboard">
            <AdminMenu />        
            <div className="dasboard-content">
                <h3>Witaj w panelu administratora</h3>

                <div className="admin-boxes">
                    <div className="admin-box admin-box1">

                        <div className="admin-box-header">
                            <p className="p-admin-box-header">Ilość użytkowników</p>
                        </div>
                        <div className="admin-box-data">
                            <p className="p-admin-box-data">48</p>
                        </div>

                    </div>
               



                    <div className="admin-box admin-box2">

                        <div className="admin-box-header">
                            <p className="p-admin-box-header">Ilość szkół</p>
                        </div>
                        <div className="admin-box-data">
                            <p className="p-admin-box-data">6</p>
                        </div>

                    </div>

                    <div className="admin-box admin-box3">

                        <div className="admin-box-header">
                            <p className="p-admin-box-header">Ilość ankiet</p>
                        </div>
                        <div className="admin-box-data">
                            <p className="p-admin-box-data">12</p>
                        </div>

                    </div>
                </div>

            </div> 
            
        
       </div>
       
        

    );
}