import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("ecommerce-operations-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
