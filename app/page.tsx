import { redirect } from "next/navigation";
import { headers } from "next/headers";

// 1. Fonksiyonu 'async' yapıyoruz
export default async function RootPage() {
  
  // 2. headers() fonksiyonunu 'await' ile bekliyoruz
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  // 3. Eğer tarayıcısında İngilizce varsa doğrudan /en rotasına fırlat
  if (acceptLanguage.toLowerCase().includes("en")) {
    redirect("/en");
  }

  // 4. İngilizce yoksa varsayılan olarak /tr rotasına fırlat
  redirect("/tr");
}