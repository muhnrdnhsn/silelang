const baseUrl = process.env.API_URL

export async function getAllEmployees(){
    try {
        const response = await fetch(`${baseUrl}/api/v1/employees`)
        if(response.status !== 200) throw new Error('An error occured')
        return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}