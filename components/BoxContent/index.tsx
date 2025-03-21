interface IBoxContentProps {
  children: React.ReactNode;
}
export function BoxContent({ children }: IBoxContentProps) {
  return (
    <div className="shadow-[0px_30px_60px_-30px_rgba(0,0,0,0.25),_0px_50px_100px_-20px_rgba(50,50,93,0.25)] p-6 rounded-lg bg-white">
      {children}
    </div>
  );
}
