// yha p actaully do tarikhe ke connection ate hai.. ek to global wala ata hai..a
// and ek jo mai bna rha hu like connection wale and connection ete. wale okh!..;

// import mongoose from 'mongoose';

// export interface ConnectionObject {
//     isConnected: number,
// }

// const connection:ConnectionObject = {};

// export async function dbConnect() {
//     try{
//          if(connection.isConnected){
//             console.log("already connected hai")
//             return
//          }
//          else{
//           const data =  await mongoose.connect(process.env.MONGO_URL!);
//           connection.isConnected = data.connections[0].readyState;
//          console.log(data, "User connected successfully!");
//          }
//     }
//     catch(e){
//         const err = e as Error
//         console.log(err, "Catch m error part aa gya hai not bad!..")
//     }
// }

// yha p ek jo hai conncetion uske kuch error hai isko dekho sahi s and 
// ek jo hitehs sir n alag tarikhe s bataya hai usko karo sahi s okkh!..;