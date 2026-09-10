import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("ecommerce-website-development");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
