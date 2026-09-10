import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("seo-audit");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
