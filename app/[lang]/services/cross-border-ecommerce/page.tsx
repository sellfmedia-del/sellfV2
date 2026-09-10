import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("cross-border-ecommerce");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
