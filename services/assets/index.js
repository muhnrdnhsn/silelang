const baseUrl = process.env.API_URL

export async function getAllAssets(){
    try {
        const response = await fetch(`${baseUrl}/api/v1/assets`)
        if(response.status !== 200) throw new Error('An error occured')
        return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAssetById(id){
    try {
        const response = await fetch(`${baseUrl}/api/v1/assets/${id}`)
        if(response.status !== 200) return null
        return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}