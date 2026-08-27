import { notFound } from "next/navigation";
import GuidedModule from "@/components/GuidedModule";
import { REGISTRATIONS } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(REGISTRATIONS).map((stepId) => ({ stepId }));
}

export default async function GuidedModulePage({
  params,
}: {
  params: Promise<{ stepId: string }>;
}) {
  const { stepId } = await params;
  const registration = REGISTRATIONS[stepId];
  if (!registration) notFound();
  return <GuidedModule content={registration} />;
}
