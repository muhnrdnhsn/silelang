import Head from "next/head"
import Link from "next/link"
import { useMemo } from "react"

export default function Error({props}){
    const description = useMemo(() => {
        switch (props.statusCode) {
            case 404:
                return 'Halaman yang kamu cari tidak ditemukan atau penjualan belum dibuka'
            case 500:
                return 'Terjadi kesalahan. Silahkan coba beberapa saat lagi'
            default:
                return ''
        }
    }, [props.statusCode])

    return (
        <div>
            <Head>
                <title>{`${props.statusCode} | ${description}`}</title>
                <meta name="description" content="Halaman tidak ditemukan" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center w-full lg:w-3/5 lg:mx-auto text-center" style={{height: 'calc(100vh - 80px)', marginTop: '-80px'}}>
                <h1 className="font-bold text-7xl lg:text-9xl tracking-widest text-teal-400">{props.statusCode}</h1>
                <h3 className="font-bold text-3xl lg:text-5xl tracking-wide text-gray-400 mb-6">Oops! {description}</h3>
                {
                    props.statusCode === 404 &&
                    <Link href='/'>
                        <span className="px-4 py-4 text-xl tracking-wide rounded border inline-block border-white hover:border-transparent hover:text-teal-400 hover:bg-white font-bold">KE HALAMAN UTAMA</span>
                    </Link>
                }
            </div>  
        </div>
    )
}

Error.getInitialProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 500
    return {
        hasNavbar: true,
      props: {
        statusCode
      }
    }
  }