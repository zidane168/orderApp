export async function POST(req: any) {

    let data = await req.formData();
    console.log(data)

    if (data.get('file')) {
        console.log('got file!!!', data.get('file'))
        
    }

    return Response.json(true)
}