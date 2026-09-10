import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("ecommerce-seo");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
