import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export async function logOut() {
  localStorage.clear();
  Cookies.remove("access_token");
  redirect("/login");
  
}
