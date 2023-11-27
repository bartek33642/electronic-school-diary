import React from "react";
import './StudentParentRemarks.css';
import { ParentMenu } from "../../menu/parent/ParentMenu";

export function ParentRemarks () {
    return(
        <div className="student-parent-remarks-container">
            <ParentMenu />
            <div className="student-parent-remarks-elements">
                <h2>Parent Remarks</h2>
            </div>
        </div>
    );
}