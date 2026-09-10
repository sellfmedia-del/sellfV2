import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("international-seo");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
