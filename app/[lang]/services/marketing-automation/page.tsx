import { getOperationMetadata, renderOperationPage } from "@/lib/operationRoute";

const operationSlug = "marketing-automation";

type RouteParams = { lang: string };

export async function generateMetadata({ params }: { params: Promise<RouteParams> }) {
  const { lang } = await params;
  return getOperationMetadata(operationSlug, lang);
}

export default async function OperationPage({ params }: { params: Promise<RouteParams> }) {
  const { lang } = await params;
  return renderOperationPage(operationSlug, lang);
}
