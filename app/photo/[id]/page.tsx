export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Photo Details</h1>
      <p>You are looking at the photo with ID: {resolvedParams.id}</p>
    </div>
  );
}