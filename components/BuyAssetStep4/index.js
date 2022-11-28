import { convertGender } from "../../helper";
import BuyAssetStep1 from "../BuyAsSetStep1";

export default function BuyAssetStep4({employee, asset}){
    return (
        <div className="w-full flex flex-col gap-4 lg:gap-6">
            <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col gap-4 lg:gap-6">
                <h4 className="text-lg md:text-lg lg:text-xl xl:text-2xl text-teal-400 uppercase">Informasi Aset</h4>
                <BuyAssetStep1 asset={asset} />
            </div>
            <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col gap-4 lg:gap-6">
                <h4 className="text-lg md:text-lg lg:text-xl xl:text-2xl text-teal-400 uppercase">Informasi Calon Pembeli</h4>
                <img src={employee.fileData} className="w-full h-40 md:h-52 lg:h-60 xl:h-72 bg-gray-400 rounded-lg" style={{objectFit: 'contain'}} />
                <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="w-full col-span-2">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Karyawan</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{employee.id} - {employee.name}</p>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Posisi</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{employee.title}</p>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Bergabung Sejak</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{employee.joinYear}</p>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Gender</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{convertGender(employee.gender)}</p>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Email Kantor</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{employee.email}</p>
                    </div>
                </div>
                <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="w-full">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Nomor NIK</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{employee.nik}</p>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Nomor HP</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{employee.phone}</p>
                    </div>
                    <div className="w-full col-span-2">
                        <p className="text-gray-400 text-sm lg:text-md xl:text-lg">Alamat Pengiriman</p>
                        <p className="text-lg lg:text-xl xl:text-2xl">{employee.address}</p>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col gap-4 lg:gap-6">
                <p className="text-md md:text-lg lg:text-xl">Dengan mengklik tombol <span className="text-teal-400">Kirim</span>, calon pembeli setuju dengan kondisi aset serta menyetujui seluruh peraturan terkait proses pembelian aset perusahaan. Seluruh data yang diisikan adalah data yang sebenar-benarnya.</p>
            </div>
        </div>
    )
}