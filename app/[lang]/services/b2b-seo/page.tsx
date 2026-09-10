import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("b2b-seo");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
