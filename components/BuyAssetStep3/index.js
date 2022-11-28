import { useEffect, useState } from "react";

export default function BuyAssetStep3(props) {
  const [nik, setNik] = useState(props.value.nik);
  const [phone, setPhone] = useState(props.value.phone);
  const [address, setAddress] = useState(props.value.address);
  const [file, setFile] = useState(props.value.file)
  const [fileData, setFileData] = useState(props.value.fileData)

  const onUploadFile = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const previewImage = () => {
    const image = new Image()
    image.src = fileData
    image.style.objectFit = 'contain'
    image.style.width = '100%'
    image.style.height = '100%'
    const w = window.open('File KTP')
    w.document.write(image.outerHTML)
    w.document.close()
  }

  useEffect(() => {
    const fileReader = new FileReader()
    let isCancel = false
    if(file){
        fileReader.onload = (e) => {
            const {result} = e.target
            if(result && !isCancel){
                setFileData(result)
            }
        }
        fileReader.readAsDataURL(file)
    }

    return () => {
        isCancel = true
        if(fileReader && fileReader.readyState === 1){
            fileReader.abort()
        }
    }
  }, [file])

  useEffect(() => {
    props.onChange({
        nik,
        phone,
        address,
        file,
        fileData
    })
  }, [props, nik, phone, address, file, fileData])
  return (
    <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col gap-4 lg:gap-6">
      <div className="w-full grid grid-cols-2 gap-4 lg:gap-4">
        <div className="w-full">
          <label
            htmlFor="nik"
            className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
          >
            Nomor NIK*
          </label>
          <input
            id="nik"
            type="number"
            className="w-full text-white bg-gray-400 placeholder-white text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
            placeholder="Nomor NIK"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="phone"
            className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
          >
            Nomor HP*
          </label>
          <input
            id="phone"
            type="number"
            className="w-full text-white bg-gray-400 placeholder-white text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
            placeholder="08123xxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onWheel={(e) => e.target.blur()}
            minLength={7}
            maxLength={13}
          />
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="address"
          className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
        >
          Alamat Pengiriman*
        </label>
        <textarea
          id="address"
          className="w-full text-white bg-gray-400 placeholder-white text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
          placeholder="Alamat Pengiriman"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ resize: "none" }}
          rows="5"
        />
      </div>
      <div className="w-full">
        <label className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg">
          Foto KTP*
        </label>
        {
            !fileData ?
            <div class="flex items-center justify-center w-full">
            <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-400 hover:bg-gray-400"
            >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" accept="image/*" onChange={onUploadFile} />
            </label>
            </div>
            :
            <div className="w-full rounded">
                <div className="w-full flex items-center gap-4 mb-4">
                    <p className="w-full text-white bg-gray-400 text-md lg:text-lg xl:text-xl rounded p-2 text-left truncate">{file.name}</p>
                    <button className="text-white border-2 text-md lg:text-lg xl:text-xl rounded py-2 px-4" onClick={previewImage}>Lihat</button>
                    <label for="change" className="text-white border-2 border-teal-400 bg-teal-400 text-md lg:text-lg xl:text-xl rounded py-2 px-4">
                        <p>Ganti</p>
                        <input id="change"  type="file" class="hidden" accept="image/*" onChange={onUploadFile}></input>
                    </label>
                </div>
                <img src={fileData} className="w-full h-64 bg-gray-400 rounded" style={{objectFit: 'contain'}} />
            </div>
        }
      </div>
    </div>
  );
}
