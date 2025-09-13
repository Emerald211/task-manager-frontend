import EditForm from "@/components/Editform";



export default function TaskDetailPage({ params }) {
  return (
    <section className=" flex min-h-screen flex-col items-center justify-center ">
     
      <EditForm taskId={params.id} />
    </section>
  );
}
