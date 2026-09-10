import { getOperationMetadata, renderOperationPage } from "@/lib/operationRoute";

type RouteParams = { lang: string };
type RouteProps = { params: Promise<RouteParams> };

export function createOperationRoute(operationSlug: string) {
  async function generateMetadata({ params }: RouteProps) {
    const { lang } = await params;
    return getOperationMetadata(operationSlug, lang);
  }

  async function OperationPage({ params }: RouteProps) {
    const { lang } = await params;
    return renderOperationPage(operationSlug, lang);
  }

  return { generateMetadata, OperationPage };
}
