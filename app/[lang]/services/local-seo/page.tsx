import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("local-seo");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
