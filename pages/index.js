import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import AssetCard from '../components/AssetCard'
import Tabs from '../components/Tabs'
import { getAssetStatus } from '../helper'
import { getAllAssets } from '../services/assets'

export default function Home(props) {
  const [currentTab, setCurrentTab] = useState('ongoing')
  const {assets} = props
  const tabs = useMemo(() => ([
    {
      label: 'Past',
      value: 'past'
    },
    {
      label: 'On Going',
      value: 'ongoing'
    },
    {
      label: 'Upcomming',
      value: 'upcomming'
    }
  ]), [])

  const renderedAssets = useMemo(() => {
    return assets.filter(asset => asset.status === currentTab)
  }, [assets, currentTab])

  const onTabChange = (tab) => {
    setCurrentTab(tab)
  }

  return (
    <div>
      <Head>
        <title>Si Lelang | Pembelian Aset Perusahaan</title>
        <meta name="description" content="Sistem Informasi Lelang Aset Perusahaan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-6">
        <div className="w-full xl:w-1/4 lg:w-2/5 md:w-1/2 mb-4 mx-auto">
          <h3 className="text-center text-teal-400 text-xl">Temukan Aset Incaranmu</h3>
          <h4 className="text-center text-gray-400 text-xl">Cari dan ajukan pembelian aset perusahaan terbaik dengan harga bersahabat.</h4>
        </div>
        <div className="w-full xl:w-1/4 lg:w-2/5 md:w-1/2 mx-auto mb-6">
          <Tabs tabs={tabs} activeTab={currentTab} onChange={onTabChange}/>
        </div>
        {
          renderedAssets.length > 0 ?
          <div className='w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {renderedAssets.map(asset => <AssetCard key={`${asset}-${asset.id}`} {...asset} />)}
          </div> :
          <p className='text-center w-full lg:w-2/5 md:w-1/2 mx-auto text-3xl mt-10'>Belum ada asset yang dijual. Pantau terus untuk mendapatkan informasi terbaru</p>
        }
      </main>
    </div>
  )
}

export async function getServerSideProps(){
  try {
    const res = await getAllAssets()
    const assets = res.map(data => {
      return {
        ...data,
        status: getAssetStatus(data)
      }
    })
    return {
      props: {
        hasNavbar: true,
        assets
      }
    }
    
  } catch (error) {
    throw new Error(error)
  }
}