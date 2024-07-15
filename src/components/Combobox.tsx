import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export type IListItem = {
  id: number,
  name: string, 
}

interface ComboboxProps {
  name: string,   // combobox name
  list: IListItem[] | undefined,
  selectItem: IListItem,
}

const ComboBox: React.FC<ComboboxProps> = ({ name, list, selectedItem } : ComboboxProps) => {
 
  const defaultItem = { id: 0, name: "-- Please Select --" };
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([ String(defaultItem.id) ]));   

  const selectedValue = React.useMemo(() => { 
    const selectedItems = list?.filter((item: any) => selectedKeys.has( String(item.id) ));  

    if (selectedItems?.length == 0) {
      return defaultItem.name
    }
 
    return selectedItems?.map((item) => item.name).join(", ") || "";
  }, [selectedKeys, list]);

  function setInputValue(ev: React.FormEvent<HTMLFormElement>) { 
    selectedItem = ev.target.value 
  }

  return (
    <>
      {
        name && (
          <label> {name} </label>
        )
      }
      <Dropdown className="combo-box">
        <DropdownTrigger>
          <div 
            variant="bordered" 
            className="p-2 border rounded-md"
          >
            {selectedValue}
          </div>
        </DropdownTrigger>
        <DropdownMenu 
          className="w-[300px] p-2 leading-[2em]  bg-white shadow-lg"
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
  
          { list?.map( (item ) => {  
            return ( 
              <DropdownItem className="hover:text-white hover:font-semibold hover:cursor-pointer hover:bg-orange-300" 
                key={ item.id }
                textValue={item.name}   
                onChange={   setInputValue }
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