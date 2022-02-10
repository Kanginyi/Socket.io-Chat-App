import React from 'react';

function MessageUsers({allUsers}) {
   const renderUsers = allUsers?.map(user => {
      return <p>{user.username}</p>
   });

   return (

      <div className="chat-users">
         <div>
            {renderUsers}
         </div>
      </div>

   );
}

export default MessageUsers;