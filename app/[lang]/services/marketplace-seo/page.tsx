import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("marketplace-seo");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
