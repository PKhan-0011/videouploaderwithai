import { dbConnect } from "@/dbConnect/connect";
import { videoModel } from "@/Model/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";
// import {Video} from '@/Model/Video';
import { NextRequest, NextResponse } from "next/server";

// get request ayega yha p that means sara data chiaye mughe yha p okkh!...

export async function GET() {
  await dbConnect();

  try {
    const videos = await videoModel.findOne({}).sort({ created: -1 }).lean();

    if (!videos) {
      console.log("koi video data hai hi nahi okkh!...");
      return NextResponse.json(
        {
          message: "video are not there any!...",
          success: false,
        },
        { status: 500 }
      );
    }

    // agar length mik gya videos ka to return kar do okkh!..

    return NextResponse.json(
      {
        videos,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    console.log(err);

    return NextResponse.json(
      {
        message: "error hai kuch yha p okkh!..",
        success: false,
      },
      { status: 500 }
    );
  }
}

//abb yha s POST request ayegi jha p actully mai sara data nahi bhejna chata kisi authtentication p lagana cahta hu okkh!..;

export async function POST(request: NextRequest) {
  try {
    // getServer sesion s session launga okkh!..;
    // iska generally matlb ye hoga like ki agar user login hai to hi videos de upload kar paye okh!..;

    const session = getServerSession(authOptions);

    if (!session) {
      // agar session m kuch galatiya hai like login hi nahi hua kuch authorize wala hi nahi hai kuch to galtiya hai isme kuch okkh!..
      console.log("login hi nahi hai okkh!..");

      NextResponse.json({ message: "Pls login" });
    }

    // yha p session true hai means login hai okkh!..

    await dbConnect();

    const body: Video = await request.json(); // ye frontend s sara data aa rha hoga okkh!..

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        {
          message: "in above m s kuch chize aa nahi paa rahi hai okkh!..",
          success: false,
        },
        { status: 500 }
      );
    }

    const videoData = {
      ...body, // iska matlb ye hai ki rest jo data hai above wala wo aa jayega okkh!..
      controls: body?.controls ?? true,
      transformation: {
        height: 1080,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await videoModel.create(videoData);

    return NextResponse.json(newVideo); // yha s video uplaod hogi okkh!..
  } catch (e) {
    const err = e as Error;
    console.log(err);
    return NextResponse.json(
      {
        message: "yha p error aya hai from dbConnect..!",
        success: false,
      },
      { status: 500 }
    );
  }
}
// Yha p do chize ayengi like GET:- and POST:- to get wala jo hai wo like GET: - get all video and POST:- create new Video okkh!..
