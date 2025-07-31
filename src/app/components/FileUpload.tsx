// "use client" // This component must be a client component

// import {
//     ImageKitAbortError,
//     ImageKitInvalidRequestError,
//     ImageKitServerError,
//     ImageKitUploadNetworkError,
//     upload,
// } from "@imagekit/next";
// import { useRef, useState } from "react";

// // UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
// const FileUpload = () => {
    
//     const [uploading, setUplaoding] = useState(false);
//     const [error, setError] = useState(0);

   

//     return (
//         <>
//             {/* File input element using React ref */}
//             <input type="file" ref={fileInputRef} />
//             {/* Button to trigger the upload process */}
//             <button type="button" onClick={handleUpload}>
//                 Upload file
//             </button>
//             <br />
//             {/* Display the current upload progress */}
//             Upload progress: <progress value={progress} max={100}></progress>
//         </>
//     );
// };

// export default FileUpload;