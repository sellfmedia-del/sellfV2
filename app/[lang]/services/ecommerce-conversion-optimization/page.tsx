import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("ecommerce-conversion-optimization");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
