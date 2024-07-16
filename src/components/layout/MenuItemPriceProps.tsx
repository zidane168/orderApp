import { ISize } from "@/app/api/product";
import { Button } from "@nextui-org/react"; 
import DeleteIcon from "@/components/icons/DeleteIcon"

export type IProps = {
    props: ISize[],
    setProps:  React.Dispatch<React.SetStateAction<ISize[]>>,
    buttonText: string,
    labelText: string
}

export default function MenuItemPriceProps({ props, setProps, buttonText, labelText } : IProps ) {

    // ------- LOGIC THÊM MỚI 1 dòng,
    async function addSize() {  // them 1 dòng mới
        setProps(oldSizes => {
            return [ ...oldSizes, { name: '', price: 0 } ]
        })
    }

    // ------- LOGIC delete mot cai dùng filter
    async function deleteSize(index: Number) {

        let newSizes = [...props]
        newSizes = newSizes.filter( (_, i) => i != index )
        setProps(newSizes) 
    }

    // ------- LOGIC EDIT SIZE 
    async function editSize(ev, index, prop = 'name') {
        const newValue  = ev.target.value 
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes;
        })
    }
    
    return (
        <div className="p-2 mb-2 bg-gray-100 rounded-md">
            <label className="font-bold text-red-600 uppercase"> { labelText } </label>      
 
            { 
            props?.length > 0 &&  
                // sizes.map( (s, index) => {   // MUST return khi dấu {}

                //     return (
                //         <div  className="flex items-center justify-around gap-4" key={  index  } > 
                //             <div className="flex items-center gap-2 grow">
                //                 <input type="text" className="font-bold text-red-600" placeholder="Size name" value={ s.name } />
                //                 <input type="number" className="p-2 rounded-md" placeholder="Extra price" value={ s.price } />
                //             </div>
                //             <div className="">
                //                 <button className="transition bg-white border-none shadow-lg hover:cursor-pointer hover:scale-110"> 
                //                     <DeleteIcon className="w-8 h-8"/>
                //                 </button>
                //             </div>
                //         </div>
                //     ) 
                // })  
                props.map( (s, index) =>    // NO NEED return khi dấu ()

                    (
                        <div  className="flex items-center justify-around gap-4" key={  index  } > 
                            <div className="flex items-center gap-2 grow">
                                <input type="text" className="font-bold text-red-600" 
                                    onChange={ev => editSize(ev, index, 'name') } 
                                    placeholder={ labelText } value={ s.name } />

                                <input type="number" className="p-2 rounded-md"  
                                    onChange={ev => editSize(ev, index, 'price') } 
                                    placeholder="Extra price" value={ s.price } />

                            </div>
                            <div className="">
                                <Button 
                                
                                    onClick={ ev => deleteSize(index) }
                                    className="transition bg-white border-none shadow-lg hover:cursor-pointer hover:scale-110"> 
                                    <DeleteIcon className="w-8 h-8"/>
                                </Button>
                            </div>
                        </div>
                    )  
                )  
            }

            <Button 
                type="button"
                className="bg-white"
                onClick={ addSize }>
                    { buttonText }
            </Button>
            
        </div>
    )
}