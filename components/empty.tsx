import Image from "next/image";

interface EmptyProps {
  label: string;
  type?: string
}

const Empty = ({ label, type }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image alt="No messages" fill src={type === "conversation" ? "/empty.png" : "/transcript.png"} />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

export default Empty;
