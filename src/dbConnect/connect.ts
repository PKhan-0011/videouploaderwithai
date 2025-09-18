// yha p actaully do tarikhe ke connection ate hai.. ek to global wala ata hai..a
// and ek jo mai bna rha hu like connection wale and connection ete. wale okh!..;

import mongoose from 'mongoose';

export interface ConnectionObject {
      isConnected?: number,
}

export const Connection : ConnectionObject = {};

export async function dbConnect(): Promise<void>{
       // to mughe first check karna hai like ki ye connected hai ya nahi okkh!..

       if(Connection.isConnected){
           // in case ye true hota hai okkh!
           console.log(Connection.isConnected); // Yha p 1 ayega okkh that mean's already connected hai okkh!..;
           console.log('db already connected');
       }

       // in case connect nahi hua okkh!.. to connect karo okkh!...
        try{
              const db = await mongoose.connect(process.env.MONGO_URL!);
              Connection.isConnected = db.Connection[0].readyState;

              // and abb Yha s Connection.isConnected = 1 aa jayegi okh that mean's ye connect ho gya hai okkh!..
              console.log(Connection.isConnected , 'connect to mongodb');
        }

        catch(e){
             const error = e as Error;
             console.log(error);
        }
}

// yha p ek jo hai conncetion uske kuch error hai isko dekho sahi s and 
// ek jo hitehsh sir n alag tarikhe s bataya hai usko karo sahi s okkh!..;


// ye jo bhi hoga like extra functionality while connection extra code Bases this are only in nextjs okkh!...