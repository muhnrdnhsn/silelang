import Image from "next/image";
import Link from "next/link";
import { convertCondition, formatCurrency } from "../../helper";


/*
props: {
  id: number,
  name: string,
  image: string,
  description: string,
  openAt: date,
  closeAt: date,
  condition: number,
  price: number,
  status: 'past' | 'upcomming' | 'ongoing'
}
*/
function AssetCardWrapper({children, ...props}){
  const condition = props.status === 'ongoing'
  const href = `/asset/${props.id}`
  if (condition) return <Link href={href}>{children}</Link>
  return children
}

export default function AssetCard(props) {
  const closeAt = new Date(props.closeAt);
  const condition = () => convertCondition(props.condition);
  const classCondition = () => {
    if (props.condition >= 75) {
      return "bg-teal-400";
    } else if (props.condition >= 50) {
      return "bg-yellow-400";
    } else if (props.condition >= 25) {
      return "bg-orange-300";
    } else {
      return "bg-red-500";
    }
  };
  return (
    <AssetCardWrapper {...props}>
      <div className="w-full flex flex-col cursor-pointer relative">
        <div className="w-full h-32 md:h-40 lg:h-48 relative">
          <Image
            fill
            objectFit="cover"
            src={props.image}
            alt={props.name}
            priority
            className="relative"
          />
          <div
            className={[
              "px-1 py-1 absolute top-5 right-0 w-32 text-center text-lg font-bold tracking-wide",
              classCondition(),
            ].join(" ")}
          >
            {condition()}
          </div>
        </div>
        <div className="px-4 py-4 bg-white">
          <h3 className="font-bold truncate text-black text-xl tracking-wide">
            {props.name}
          </h3>
          <div className="w-full h-28 overflow-hidden">
            <p className="text-gray-400 text-lg tracking-wide">
              <span className="text-teal-400 font-bold">Kondisi: </span>
              {props.description}
            </p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="w-auto text-lg font-bold tracking-wide text-black">
              {formatCurrency(props.price)}
            </p>
            <div className="text-gray-400 w-40 border text-center text-lg tracking-wide">
              Close: {closeAt.toLocaleDateString()}
            </div>
          </div>
        </div>

        {props.status !== "ongoing" && (
          <div className="absolute top-0 w-full h-full bg-gray-400 opacity-30 cursor-default"></div>
        )}
      </div>
    </AssetCardWrapper>
  );
}
