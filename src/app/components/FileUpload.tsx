"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { Span } from "next/dist/trace";

import { useRef, useState } from "react";

interface fileUPload {

    onProgress: () => void;
    onSuccess?: () => void;
    fileType?: "video" | "image";

}

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const UploadExample = ({
    onProgress,
    onSuccess,
    fileType
}: fileUPload) => {
    
    const [uploading, setUploading] = useState(null);
    const [error, setError] = useState<string | null>(null);


      // fist valodation ata hai like validateFile wala okkh!..
      // optional validation..
       
      const validationFile = (file: File) => {
            if(fileType === 'video'){
                if(!file.type.startsWith("video/")){
                    setError('file uplaoding m kuch gdbd hai okkH!..')
                }
            }

            // iske baad file ki length check kar lenge okkh!..

            if(file.size > 100*1024*1024){
                setError('file size must be less than 100 mb');
            }

             return true
      }
       
     
      const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
              
      }
         

         

    return (
        <>
           
            <input type="file"  
             accept = {fileType === 'video' ? 'video/*' : "images/*"}
             onChange = {handleFileChange}

            />
            
            {uploading && (
                 <span>Loading...</span>
            )}
           
           
        </>
    );
};

export default UploadExample;

// step's to define how to code such kind of code bases!...

// Note** firstStep: define state's, define fileValdations, hanldeChange define, uske andar hi checking hogi like ki
// ki file hai bhi thik ya nahi and fileValidation bhi in case glt hua to show error.. and then api call hogi backend p
// wha s data lenge hamm sara ka sara and usko json m convert karenge bcz fetch hame strings m deti hai chize okkh..
// uske badd sara data hamm uplaod method wale m daal denge okkh!...and wha shamm onProcess and sucess bhi fill kar denge..


//     catch (error) {
//             // Handle specific error types provided by the ImageKit SDK.
//             if (error instanceof ImageKitAbortError) {
//                 console.error("Upload aborted:", error.reason);
//             } else if (error instanceof ImageKitInvalidRequestError) {
//                 console.error("Invalid request:", error.message);
//             } else if (error instanceof ImageKitUploadNetworkError) {
//                 console.error("Network error:", error.message);
//             } else if (error instanceof ImageKitServerError) {
//                 console.error("Server error:", error.message);
//             } else {
//                 // Handle any other errors that may occur.
//                 console.error("Upload error:", error);
//             }
//        }


 // This component must be a client component


