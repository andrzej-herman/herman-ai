import Image from "next/image";

interface LoaderProps {
  long?: boolean;
}

const Loader = ({ long }: LoaderProps) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="Herman AI Logo" fill src="/mainlogo.png" />
      </div>
      <p className="text-sm text-muted-foreground">Geniusz myśli ...</p>
      {long ? (
        <p className="text-sm text-muted-foreground">
          Prosze o cierpliwość. Generowanie video trwa ok 1-2 min.
        </p>
      ) : null}
    </div>
  );
};

export default Loader;
