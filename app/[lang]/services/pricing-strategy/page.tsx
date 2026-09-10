import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("pricing-strategy");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
