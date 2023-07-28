import {http} from "./http"
import { type PostItem } from "@/definitions/post"

export async function get() {
    return await http.get<PostItem[]>("https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/")
}