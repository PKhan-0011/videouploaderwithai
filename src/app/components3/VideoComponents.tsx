import React from 'react'
import {Video} from '@imagekit/next';
import { IVideo } from '@/Model/Video';
import Link from 'next/link';

const VideoComponents = ({video}: {video:IVideo}) => {
  return (
    <div className='card bg-base-100 shadow hover:shadow-lg transition-all duration-300'>

        <Link href={`/video/${video._id}`} className='block'>
            <Video 
              src={video.videoUrl}
              width={1080}
              height={1080}
              controls={video.controls ?? true}
              className="w-full roundex-xl object-cover"
            />
        </Link>
         
      {/* Video Info */}

        <div className='p-4'>
             <Link href={`/videos/${video._id}`} className='block hover:opacity-80 transition-opacity'>
              <h2 className='text-lg font-bold'>{video.title}</h2>
             </Link>
             <p className='text-sm text-base-content/70 line-clamp-2'>{video.description}</p>
        </div>
        
    </div>
  )
}

export default VideoComponents;