import balignon from "../assets/balignon.png";

export default function NotFound() {
  return (
    <div className="h-screen bg-slate-300 p-4 flex flex-col gap-2 items-center">
      <h1 className="text-6xl text-center">404 : Not found</h1>
      <h2 className="text-4xl text-center">OOOOOOOOUUUUUUUPPPPPPPPPSSSSSS</h2>
      <img src={balignon} alt="balignon" width={350} />
    </div>
  );
}
