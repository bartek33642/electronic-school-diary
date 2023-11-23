import React from "react";
import './StudentParentTopics.css';
import { ParentMenu } from "../../menu/parent/ParentMenu";

export function ParentTopics(){
    return(
        <>
        <div className="parent-topics-container">
            <ParentMenu />
            <div className="parent-topics-elements">

            </div>
        </div>
        </>
    );

}