import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("checkout-optimization");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
