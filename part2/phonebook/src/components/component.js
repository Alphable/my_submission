import React from "react";
export const Person = ({person, handleDelete}) => {
    return(
        <li className ="person">
            {person.name} {person.number}
            <button onClick={handleDelete}>delete</button>
        </li>
    )
}
export const Notification = ({message}) => {
    if (message && message.includes('been removed')){
        return(
            <div className="failed">
                {message}
            </div>
        )
    }else{
        return(
            <div className="done">
                {message}
            </div>
        )
    }

}

