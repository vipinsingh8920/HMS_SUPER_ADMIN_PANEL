
import HospitalDetailsClient from "@/components/hospitals/HospitalDetailsClient";

export default async function HospitalDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <HospitalDetailsClient
      hospitalId={Number(id)}
    />
  );
}