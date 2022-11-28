/*
    props: {
        asset
    }
*/

import Image from "next/image";
import { useMemo } from "react";
import { convertCondition, formatCurrency, formatDate } from "../../helper";

export default function BuyAssetStep1({asset}){
    const openDate = useMemo(() => formatDate(new Date(asset.openAt)), [asset])
    const closeDate = useMemo(() => formatDate(new Date(asset.closeAt)), [asset])
    const conditionText = useMemo(() => convertCondition(asset.condition), [asset])
    return (
        <div className="w-full rounded-lg">
            <div className="w-full relative h-40 md:h-52 lg:h-60 xl:h-72 rounded-lg mb-6">
                <Image
                    fill
                    objectFit="cover"
                    src={asset.image}
                    alt={asset.name}
                    priority
                    className="relative rounded-lg"
                />
            </div>
            <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="w-full">
                    <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Nama Asset</p>
                    <p className="text-lg lg:text-xl xl:text-2xl">{asset.name}</p>
                </div>
                <div className="w-full">
                    <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Harga</p>
                    <p className="text-lg lg:text-xl xl:text-2xl">{formatCurrency(asset.price)}</p>
                </div>
                <div className="w-full">
                    <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Kondisi</p>
                    <p className="text-lg lg:text-xl xl:text-2xl">{conditionText} ({asset.condition}%)</p>
                </div>
                <div className="w-full">
                    <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Periode Penawaran</p>
                    <p className="text-lg lg:text-xl xl:text-2xl">{openDate} - {closeDate}</p>
                </div>
                <div className="w-full col-span-2">
                    <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Catatan</p>
                    <p className="text-lg lg:text-xl xl:text-2xl">{asset.description}</p>
                </div>
            </div>
        </div>
    )
}