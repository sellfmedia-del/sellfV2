import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("product-photography");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
