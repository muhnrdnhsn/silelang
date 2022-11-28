import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import BuyAssetStep1 from "../../components/BuyAsSetStep1"
import BuyAssetStep2 from "../../components/BuyAssetStep2"
import BuyAssetStep3 from "../../components/BuyAssetStep3"
import BuyAssetStep4 from "../../components/BuyAssetStep4"
import Progress from "../../components/Progress"
import { getAssetStatus } from "../../helper"
import { getAssetById } from "../../services/assets"
import { getAllEmployees } from "../../services/employees"

const steps = [
    {
        icon: 1,
        label: 'Informasi Aset'
    },
    {
        icon: 2,
        label: 'Data Karyawan'
    },
    {
        icon: 3,
        label: 'Data Pribadi'
    },
    {
        icon: 4,
        label: 'Tinjau'
    }
]
export default function AssetPage(props){
    const [currentStep, setCurrentStep] = useState(0)
    const [empID, setEmpID] = useState(undefined)
    const [empEmail, setEmpEmail] = useState(undefined)
    const [nik, setNik] = useState(undefined)
    const [phone, setPhone] = useState(undefined)
    const [address, setAddress] = useState(undefined)
    const [fileData, setFileData] = useState(undefined)
    const [file, setFile] = useState(undefined)
    const [disabledButton, setDisabledButton] = useState(false)

    const router = useRouter()
    const selectedEmp = useMemo(() => {
      if(!empID) return {}
      return props.employees.find(emp => emp.id === empID)
    }, [empID, props])
    const renderStep = () => {
      switch (currentStep) {
        case 0:
          return <BuyAssetStep1 asset={props.asset} />
        case 1:
          return <BuyAssetStep2 employees={props.employees} empID={empID} empEmail={empEmail} onChange={({empID, empEmail}) => {
            setEmpID(empID)
            setEmpEmail(empEmail)
          }} />
        case 2:
          return <BuyAssetStep3 value={{
            nik,
            phone,
            address,
            file,
            fileData
          }} onChange={({nik, phone, address, fileData, file}) => {
            setNik(nik)
            setPhone(phone)
            setAddress(address)
            setFileData(fileData)
            setFile(file)
          }} />
        case 3:
          return <BuyAssetStep4 asset={props.asset} employee={{
            ...selectedEmp,
            email: empEmail,
            nik,
            phone,
            address,
            fileData
          }}/>
        default:
          return <></>;
      }
    }
    const onClickBack = () => {
      if(currentStep === 0){
        router.push('/')
      }else{
        setCurrentStep(prev => prev-1)
      }
    }
    const onClickNext = () => {
      if(currentStep !== steps.length - 1){
        setCurrentStep(prev => prev+1)
      }else{
        router.push('/')
      }
    }

    useEffect(() => {
      if(currentStep === 0) setDisabledButton(false)
      else if(currentStep === 1) setDisabledButton(!empID || !empEmail)
      else if(currentStep === 2) setDisabledButton(!nik || !phone || !address || !file || !fileData)
    }, [currentStep, empID, empEmail, nik, phone, address, file, fileData])
    return(
        <div>
            <Head>
                <title>Si Lelang | Pembelian Aset Perusahaan</title>
                <meta name="description" content="Sistem Informasi Lelang Aset Perusahaan" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container mt-10 mx-auto px-6 py-6 w-full lg:w-3/5 xl:w-1/2">
                <Progress steps={steps} currentStep={currentStep} />
                <div className="mt-6 mb-6">
                  {renderStep()}
                </div>
                <div className="w-full flex items-center justify-end gap-6">
                  <button className="rounded border-2 text-xl py-2 px-4 border-white" onClick={onClickBack}>{currentStep === 0 ? 'Batal' : 'Kembali'}</button>
                  <button className="rounded bg-teal-500 border-2 border-teal-500 text-xl py-2 px-4 text-white disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed" onClick={onClickNext} disabled={disabledButton}>{currentStep === steps.length-1 ? 'Kirim' : 'Selanjutnya'}</button>
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps({params}){
    try {
      const assetRes = await getAssetById(params.id)
      const empRes = await getAllEmployees()
      if (!assetRes || getAssetStatus(assetRes) !== 'ongoing') return {notFound: true}
      return {
        props: {
          hasNavbar: true,
          asset: {
            ...assetRes,
            status: getAssetStatus(assetRes)
          },
          employees: empRes.map(({joinDate, ...emp}) => ({
            ...emp,
            joinYear: new Date(joinDate).getFullYear()
          }))
        }
      }
      
    } catch (error) {
      throw new Error(error)
    }
  }