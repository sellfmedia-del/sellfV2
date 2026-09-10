import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("product-listing-optimization");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
