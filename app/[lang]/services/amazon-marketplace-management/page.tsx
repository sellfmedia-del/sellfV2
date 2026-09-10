import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("amazon-marketplace-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
