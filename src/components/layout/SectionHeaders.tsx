

export interface ISectionHeader {
    subHeader?: string,
    mainHeader?: string
}


export default function SectionHeaders({ subHeader, mainHeader=''} : ISectionHeader) {
    return (
        <>
            <h3 className="text-3xl font-semibold leading-4 text-gray-600 uppercase"> { subHeader } </h3>
            <h2 className="mt-4 text-4xl italic font-bold text-primary"> { mainHeader } </h2>
        </>
    )
}