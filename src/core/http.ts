import { authentication, createDirectus, rest } from "@directus/sdk";
import { LOCAL_USER_KEY } from "../configs/auth.config";
class LocalStorage {
  get() {
    return JSON.parse(localStorage.getItem(LOCAL_USER_KEY) || "{}");
  }
  set(data: any) {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
  }
}

const storage = new LocalStorage();
const HTTP = createDirectus(import.meta.env.VITE_PUBLIC_API_URL)
  .with(rest())
  .with(authentication("json", { storage }));
export default HTTP;
