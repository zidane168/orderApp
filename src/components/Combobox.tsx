import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, ButtonGroup} from "@nextui-org/react";
 
export type IListItem = {
  id: number,
  name: string, 
}

interface ComboboxProps {
  name: string,   // combobox name
  list: IListItem[] | undefined,
  setSelectedItem: React.Dispatch<React.SetStateAction<IListItem>>,
}

const ComboBox: React.FC<ComboboxProps> = ({ name, list, setSelectedItem } : ComboboxProps) => {
 
  const defaultItem = { id: 0, name: "-- Please Select --" };
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([ String(defaultItem.id) ]));   

  const selectedValue = React.useMemo(() => { 
    const selectedItems = list?.filter((item: any) => selectedKeys.has( String(item.id) ));   
    
    if (selectedItems?.length == 0) {
      return defaultItem.name
    }
 
    return selectedItems?.map((item) => item.name).join(", ") || "";
  }, [selectedKeys, list]);
 
  function handleSelectionChange(newSelectedKeys: Set<string>) {
    setSelectedKeys(newSelectedKeys)

    const selectedItems = list?.filter((item) => newSelectedKeys.has(String(item.id)))

    setSelectedItem(selectedItems[0]);
    return (selectedItems?.map((item) => item.name).join(", ") || "")
  }

  const variants = ["Solid", "Bordered", "Light", "Flat", "Faded", "Shadow"]
  const variant = variants[1]
  const color = ["Default", "Primary", "Secondary", "Success", "Warning", "Danger"]

  return (
    <>
   <Button color="success">
      Button
    </Button>

      {
        name && (
          <label> {name} </label>
        )
      }
      <Dropdown 
      //  classNames={{
      //   base: "before:bg-default-200", // change arrow background
      //   content: "p-0 border-small border-divider bg-background",
      // }}
         className="combo-box"
        >
        <DropdownTrigger>
          <div 
            variant={ variant }
            className="p-2 border rounded-md"
          >
            {selectedValue}
          </div>
        </DropdownTrigger>
        <DropdownMenu 
          className="w-[300px] p-2 leading-[2em]  bg-gray-200 shadow-lg rounded-lg"
          aria-label=""
          variant={ variant }
          color={ color[3] }
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={ handleSelectionChange }
        >
          { list?.map( (item ) => {  
            return ( 
              <DropdownItem 
                className="hover:text-white hover:font-semibold hover:cursor-pointer hover:bg-orange-300" 
               //  startContent={<RightIcon className='w-8 h-8' /> }
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