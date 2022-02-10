import React, {useState} from 'react';

import {BsArrowUpCircleFill, BsArrowDownCircleFill} from "react-icons/bs";

function MessageUsers({allUsers}) {
   const [showAllUsers, setShowAllUsers] = useState(false);

   const renderUsers = allUsers?.map(user => {
      return <p>{user.username}</p>
   });

   const showUsers = () => {
      setShowAllUsers(prev => !prev);
   }

   return (
      <div className="chat-users">
         <button onClick={showUsers}>
            {
               showAllUsers
               ?
               <BsArrowUpCircleFill className="show-users-circle" title="Hide All Users"/>
               :
               <BsArrowDownCircleFill className="show-users-circle" title="Show All Users"/>
            }
         </button>

         {
               showAllUsers
            ?
               <div className="show-all-users">
                  {renderUsers}
               </div>
            : 
               <div className="chat-dropdown">
                  Show All Users ({allUsers.length})
               </div>
         }
      </div>
   );
}

export default MessageUsers;