import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem  } from "@nextui-org/dropdown";
 
export type IListItem = {
  id: number,
  name: string, 
}

interface ComboboxProps {
  name: string,   // combobox name
  list: IListItem[],
  setSelectedItem: React.Dispatch<React.SetStateAction<IListItem>>,
  defaultItem?: IListItem,
  isRequired: boolean,
}
 

const ComboBox: React.FC<ComboboxProps> = ({ 
  isRequired = true,
  name, 
  list, 
  setSelectedItem,
  defaultItem } : ComboboxProps) => {
  
  defaultItem = defaultItem ? defaultItem : {id: list[0]?.id, name: list[0]?.name}
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([ String(defaultItem.id) ]));   

  const selectedValue = React.useMemo(() => { 
    const selectedItems = list?.filter((item: any) => selectedKeys.has( String(item.id) ));   
    
    if (selectedItems?.length == 0) {
      return defaultItem.name
    }
 
    return selectedItems?.map((item) => item.name).join(", ") || "";
  }, [selectedKeys, list]);
 
  function handleSelectionChange(newSelectedKeys: any) {  //Set<string>) {
    setSelectedKeys(newSelectedKeys)

    const selectedItems: any = list?.filter((item) => newSelectedKeys.has(String(item.id)))

    setSelectedItem(selectedItems[0]); 
    return (selectedItems?.map((item: any) => item.name).join(", ") || "")
  }

  const variants = ["Solid", "Bordered", "Light", "Flat", "Faded", "Shadow"]
  const variant = variants[1]
  const color = ["Default", "Primary", "Secondary", "Success", "Warning", "Danger"]

  return (
    <>

      {
        name && (
          <label> {name} { isRequired === true ? (<span className="text-primary"> (*) </span>) : '' }</label>
        )
      }
      <Dropdown 
         className="combo-box"
        >
        <DropdownTrigger>
          <div 
            // variant={ variant }
            className="p-2 border rounded-md"
          >
            {selectedValue}
          </div>
        </DropdownTrigger>
        <DropdownMenu 
          className="w-[300px] p-2 leading-[2em]  bg-gray-200 shadow-lg rounded-lg"
          aria-label=""
          // variant={ variant }
          // color={ color[3] }
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={ handleSelectionChange }
        >
          { list?.map( (item: any ) => {  
            return ( 
              <DropdownItem 
                className="hover:text-white hover:font-semibold hover:cursor-pointer hover:bg-orange-300"  
                key={ item.id }
                textValue={item.name}    
                > { item.name } 
              </DropdownItem>
            )
          }   )}
          
        
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default ComboBox;