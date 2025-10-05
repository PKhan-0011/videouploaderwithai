import React from 'react'

import {createContext, useContext, useState, ReactNode} from 'react';

type Notification = "success" | "error" | "warning" | "info";

interface NotificationContextType {
    showNotification: (message: string, type:Notification) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);



export const Notification = ({children}: {children: ReactNode}) => {
     
    const [notification, setNotification] = useState<{message: string; type:Notification ; id: number} | null>(null);

      const showNotification = (message: string, type: Notification) => {
       const id = Date.now();
       setNotification({message, type, id});
       setTimeout(() => {
          setNotification((current) => (current?.id === id ? null : current))
       }, 3000);
 };

    function getAlertClass(type: Notification ): string{
       if(type === 'success'){
          return 'alert-sucess';
       }
       else if(type === 'error'){
         return 'alert-error';
       }
       else if(type === 'warning'){
           return 'alert-warning';
       }
       else{
          return 'alert-info'
       }
    }



  return (
    <div>
         <NotificationContext.Provider  value={{showNotification}}>
             {children}

             {notification && (
                 <div className='toast toast-bottom toast-end z-[100]'>
                     <div className={`alert ${getAlertClass(notification.type)}`}>
                             <span>{notification.message}</span>
                     </div>
                 </div>
             )}
         </NotificationContext.Provider>
    </div>
  )
}


export function useNotification(){
    const context = useContext(NotificationContext);

    if(context === undefined){
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        )
    }

    return context;
}

export default Notification


// Muge actaully kuch data send karna hai kahi p okkh!..
// like app se profile m send karna hai okh!, app -> navBar -> Profile. 
