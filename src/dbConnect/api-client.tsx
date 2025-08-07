import { Video } from "@/Model/Video";

export type VideoFormData = Omit<Video, "_id">;

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE" 
    body?: any
    headers?: Record<string, string> 
}



class ApiClient{
    private async fetch<T>(
        endPoint: string,
        options: FetchOptions
    ): Promise<T> {
        const {method = "GET", body, headers = {}} = options

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        }

        const response: Response = await this.fetch(`/api${endPoint}`, {
            method,
            headers:defaultHeaders,
            body: body ? JSON.stringify(body): undefined
        });

        // ye bhul jata hai tu like ki fetch karnge to wo objcets m ayega usko string's m convert karo..;
           
        console.log(response);

        // is type of unkown aa rha hai iska generally matlb ye hota hai ki ye single type ka hai isko thik karo okh!..;

        if(!response.ok){
            throw new Error(await response.text());
        }

        return response.json();
    }

    async getVideos(){
        return this.fetch("/video", {
            method: "GET"
        });
    }

    async createVideos(videoData: Video){
        return this.fetch('/video', {
            method: "POST",
            body: videoData
        })
    }
}

export const apiClient = new ApiClient(); // ye singleton hai okkh!..;


// ye mughe nahi aya bilul smjh isko sahi s dekhio  okkh!...