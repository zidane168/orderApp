

export interface ISectionHeader {
    subHeader: string,
    mainHeader: string
}


export default function SectionHeaders({ subHeader, mainHeader } : ISectionHeader) {
    return (
        <>
            <h3 className="uppercase text-gray-600 font-semibold leading-4"> { subHeader } </h3>
            <h2 className="text-primary font-bold text-4xl italic"> { mainHeader } </h2>
        </>
    )
}