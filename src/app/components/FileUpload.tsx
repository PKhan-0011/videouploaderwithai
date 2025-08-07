"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";

import { useState } from "react";


interface FileUploadProps {
    onSuccess: (res:any) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}

const FileUpload = ({
    onSuccess,
    onProgress,
    fileType
}: FileUploadProps) => {
   
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>('');

    console.log(error);

    
        // ye optional hai but khud s ki gayi validation hai okkh!..;
     const fileValidation = (file: File) => {

           if(fileType === 'video'){
              if(!fileType.startsWith('/api/video/mp4')){
                 setError("pls upload a valid file")
              }
           }
           if(file.size > 100* 1024 * 1024){
              setError('file Size must be less than 100 mb')
           }

           return true // iska matlb sabb thik hai..
     }

     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); // isse generally higa ye like ki yha s extra chize nahi jayegi backend p okkh!..;
        const file = e.target.files?.[0]
        
        // yha p mere pass actaully files ka bhandar hai okkh!..; jisme har ek elment chiaye mughe;

        if(!file || !fileValidation(file)){
            return 
            setUploading(true);
            setError(null);
        }

        try{
                const authRes = await fetch('/api/imageKitUplaod-auth'); // ye to json m ayega actauuly but mughe isko strings m dalna hai okkh!..;
                const data = await authRes.json(); // ye strings m convert ho gyaa hai..
                 
                 const res = await upload({
                expire: data.expire,
                token: data.token,
                signature: data.signature,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                file, // bcz ye file upar s aya hai okkh!... backend s nahi.. clear
                fileName: file.name, 
                
                // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress){
                        const percentage = (event.loaded / event.total) * 100;

                        onProgress(Math.round(percentage));
                    }
                },
              
            });
              console.log(res);
              onSuccess(res)
        }

        catch(error){
           if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }

        }finally{
            setUploading(false); // iski isliye need thi bcz hamne isko try and catch m false nhai mark kiya after calling..;
        }

     };
    
    return (
        <>
           
            <input type="file" 
              accept={fileType === 'video' ? "video/*" : "image/*"}
              onChange={handleFileChange}
            />
             {uploading && <span>Loading....</span>}
        </>
    );
};

export default FileUpload;

// step's to define how to code such kind of code bases!...

// Note** firstStep: define state's, define fileValdations, hanldeChange define, uske andar hi checking hogi like ki
// ki file hai bhi thik ya nahi and fileValidation bhi in case glt hua to show error.. and then api call hogi backend p
// wha s data lenge hamm sara ka sara and usko json m convert karenge bcz fetch hame strings m deti hai chize okkh..
// uske badd sara data hamm uplaod method wale m daal denge okkh!...and wha shamm onProcess and sucess bhi fill kar denge..


