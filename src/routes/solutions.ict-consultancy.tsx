import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { SERVICES } from "@/lib/services";
import { pageHead } from "@/lib/seo";

const service = SERVICES.find((item) => item.slug === "ict-consultancy")!;

export const Route = createFileRoute("/solutions/ict-consultancy")({
  head: () => pageHead(
    `${service.title} | Clisanco Technologies`,
    service.summary
  ),
  component: () => <ServiceDetailPage slug="ict-consultancy" />,
});
