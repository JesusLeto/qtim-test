import axios from "axios";

export class HttpError {
    message: string
    constructor(m: string) {
        this.message = m
    }
}

class HTTP {
    async get<T>(url:string) {
        try {
            const res = await axios.get<T>(url)
            return res.data
        } catch (error) {
        
            return new HttpError("Some Axios Error");
          }
    }
}


export const http = new HTTP()