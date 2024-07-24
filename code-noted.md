# resouces
https://heroicons.com/
sweetalert2
toast
react-flying-item: yarn add react-flying-item

# tsx
because of have html, render
# ts 
just function, const thing

# ------------------------------------------------------
## Tạo một file ra ngoài (clean code)
# ------------------------------------------------------
import no khi su dụng xem UseProfile.tsx, pages/categories.tsx

const { loading: profileLoading , data: profileData } = useProfile(); // tra
const [ newCategory, setNewCategory ] = useState('')

if (profileLoading) {
    return "Loading user info ..."
}

if (!profileData.admin) {
    return 'Not admin';
}

# ------------------------------------------------------
## Dùng mongo atlas tạo một cái database mới
# ------------------------------------------------------
https://cloud.mongodb.com/v2#/org/6666747e9e960031026ef485/billing/overview
rockman1688


# ------------------------------------------------------
## Dùng google auth, credential
# ------------------------------------------------------
api/auth/[...nextauth]/route.js

# ------------------------------------------------------
## Các thư viện hay
# ------------------------------------------------------
- react-hot-toast: react toast
- 

# ------------------------------------------------------
## How to use react-hot-toast
# ------------------------------------------------------
import { Toaster } from 'react-hot-toast'
để <Toaster />  on app/layout.tsx

trang cần toast
import toast  from 'react-hot-toast';

## TH cần toast async thì phải tao create async như sau
  const savePromise = new Promise(async(resolve, reject) => { 
    const response = await fetch('api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: userName})
    })

    const { ok } = response

    setIsSaving(false)
    if ( ok ) {
        setSaved(true)
        resolve()
    } else {
        reject()
    }
})

await toast.promise(savePromise, {
    loading: 'Saving ...',
    success: 'Profile saved!',
    error: 'Error',
})

## TH khong cần async
toast('Uploading ...')

# ------------------------------------------------------
## khai bao biến
# ------------------------------------------------------

## for form
React.FormEvent<HTMLFormElement>
async function handleProfileInfoUpdate(e: React.FormEvent<HTMLFormElement>)

## for files
React.ChangeEvent<HTMLInputElement> 
async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) 
    const files = ev.target.files;

## for setLink dispatch ( const [ link, setLink ] = useState() )
## <EditableImage link={ link } setLink={ setLink } />
interface IEditableImage {
    link: string,
    setLink: React.Dispatch<React.SetStateAction<string>>
}

const uploadPromise = fetch('/api/upload', {
    method: 'POST',
    body: data,
}).then(response => {
    if (response.ok) {
        return response.json().then(link => {
            setLink(link)
        })
    } 
    throw new Error('Something went wrong')
})

# ------------------------------------------------------
## create / updated / show realtime on Category/page.tsx 
# ------------------------------------------------------
create cong sẽ tự reload lai và khi bấm vào edit se tư sưa 
hoc cách items-start tat ca cả image, label, button se đứng ở dòng trên cùng


 <div className="flex items-start gap-2"> 
    <div>
        Image
    </div>
    <div className="grow">
        <label> Menu item name </label>
        <input type="text" />
    </div>
    <div>
        <button className="mb-2" type="submit"> Create</button>
    </div>
</div>

# ------------------------------------------------------
# Modified array before return!!!
# ------------------------------------------------------
constructor(document: EventExpense, domain: string | null) { 
    const { id,  eventId, expenseType, company, brandPercents, serviceDescription, plannedAmount, actualAmount, paidBy, settledBySponsor, claimStatus, claimRemarks, enabled, eventExpenseFiles  } = document || {};
    Object.assign(this, {  id, eventId, expenseType, brandPercents, company, serviceDescription, plannedAmount, actualAmount, paidBy, settledBySponsor, claimStatus, claimRemarks, enabled, eventExpenseFiles });
    this.id = id
    this.eventId = eventId
    this.expenseType = expenseType ?? '';    
    this.company = company ?? '' 
    this.serviceDescription = serviceDescription ?? ''    
    this.plannedAmount = plannedAmount ?? 0
    this.actualAmount = actualAmount ?? 0;
    this.paidBy = paidBy
    this.settledBySponsor = settledBySponsor ?? true;  
    this.claimStatus = claimStatus ?? true
    this.claimRemarks = claimRemarks ?? ''   

    const updateEventExpenseFiles = eventExpenseFiles?.map( (item) => {
      item.path = domain + '/' + item.path 
      return item
    })  

    this.eventExpenseFiles = updateEventExpenseFiles 

    if (brandPercents) {
      let temp: any[] = brandPercents.map((brand) => {
        return {
          "brandId": brand.brandId, 
          "brandName": brand.brand.vendorName,
          "percent": brand.percent
        }
      })
      this.brandPercents =  temp
    } 

    this.enabled = enabled ?? true;
  }

## ------------------------------------------------------
  const brandPercents = data.brandPercents.map( (brand) => {
                const temp = new BrandPercent(); 
                temp.eventExpenseId = id
                temp.brandId = brand.brandId
                temp.percent = brand.percent 
                return temp 
            })   
            await this.brandPercentRepository.save(brandPercents) 
            item.brandPercents = brandPercents;  

## xem tiep 6:11:51 


## dùng cách này để mà wrap nó lại, thay vì phải su dung const { data: session } = useSession() o component (có return) nhưng mình su dung o component memberApi
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const { data: session } = useSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}


# server call client component will cause
 GET /api/auth/error?error=(0%20%2C%20_members_member_api__WEBPACK_IMPORTED_MODULE_5__.memberApi)%20is%20not%20a%20function 200 in 27ms
 ✓ Compiled in 1327ms (965 modules)

# so let solving the issue server call to client, we need to change to way to use useSession()
Server side call: const {data: session} = useSession() (import { useSession } from 'next-auth/react')
Client side call: const session = getSession()  (import { getSession } from 'next-auth/react')

export interface ISession {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  expires: string;
  [key: string]: any;
}
 
src/app/api/members/member.api.tsx
export function memberApi(session: ISession | null) 
{    
  const register = (payload: IMember) => {
    return commonAxios.post<AxiosResponseData>("/api/v1/members/register.json", {
      ...payload,
    });
  }

  const login = () => {

  }

   return { login, register }
}

src/app/customHook/useSessionData.ts
import { getSession } from 'next-auth/react'
export function useSessionData() = async() => {
  const session = await getSession();
  return session
}
 
//----- used ------
import { memberApi } from '@app/api/members/member.api';
import { useSessionData } from '@app/customHook/useSessionData'
async authorize(credentials, req) {  
   const session = await useSessionData()
   const { login } = memberApi(session) 

   const res = await login({
    email: credential.email,
    password: credential.password,
   })
   ...
}


# useSession là hook bất đồng bộ, so sometimes you get undefined the data value


# nếu sử dụng { thì phải có return () khi dùng map
# CÚ PHẢP NHỚ: KHÔNG tròn THÌ cần return
  { 
    sizes?.length > 0 &&  
      sizes.map( (s, index) => { 
          return (
              <div   key={  index  } > 
                  <input type="text" placeholder="Size name" value={ s.name } />
                  <input type="number" placeholder="Extra price" value={ s.price } />
              </div>
          ) 
      })  
  }

# nếu sử dụng dấu ngoăc tròn thì ko cần RETURN khi dùng map
# CÚ PHẢP NHỚ: đã tròn ko cần return
      sizes.map( (s, index) =>   
        (
          <div  className="flex items-center justify-around gap-4" key={  index  } > 
              <div className="flex items-center gap-2 grow">
                  <input type="text" className="font-bold text-red-600" placeholder="Size name" value={ s.name } />
                  <input type="number" className="p-2 rounded-md" placeholder="Extra price" value={ s.price } />
              </div>
              <div className="">
                  <button className="transition bg-white border-none shadow-lg hover:cursor-pointer hover:scale-110"> 
                      <DeleteIcon className="w-8 h-8"/>
                  </button>
              </div>
          </div>
      )  
  )  


# Thiếu dấu =
const ComboBox: React.FC<ComboboxProps> = ({ list } : ComboboxProps) => {}
 
# need compare this one
const [selectedKeys, setSelectedKeys] = React.useState(new Set(["-- Please Select --"]));   
export type IListItem = {
  id: number,
  name: string, 
}
const selectedItems = list?.filter((item: any) => selectedKeys.has( String(item.id) )); 

# cách truyền param
<input type="file" className="hidden" onChange={ handleFileChange } />

# define func
async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {   
  const files = ev.target.files;
  console.log(files)
  if (files?.length > 0) { ...  }
}
 
onChange={ e => setValue(e.target.value) }

# JSX
{ link && (
  <Image priority={false}  className="w-full h-full mb-1 rounded-lg" src={ link } width={ 100 } height={ 100 } alt={'avatar'} /> 
)}

# cú pháp filter
let arr = arr.filter( (value, index) => index != indexCanRemove )

# cách nối chuỗi trong Link
<Link href={ '/menu-items/' + id }>
    <button className="px-6 py-2 mt-2 text-white rounded-full bg-primary"> 
        Update ${ basePrice }
    </button>
</Link>


# thêm router cho eidt
tao thu muc 
menu-items/page.tsx
menu-items/new/page.tsx
menu-items/edit/[id]/page.tsx <=> menu-items/edit/111

# useParams() dể lấy id trên đường dẫn url: menu-items/edit/id 
  const { id } = useParams()


# use import swal from "sweetalert";

# import { useRouter } from "next/navigation"
push ('/menu-items')


# remove method

  const remove = (payload: IGetProduct) => {
      return commonAxios.delete<AxiosResponseData>("/api/v1/products/remove.json", {
          data: {
              id: payload.id,     // need pass the id same this on post man with {id: 18}
          }
      });
  }

# use this one for reload current page
 window.location.reload()


# neu co loi
1. TypeError: prev is not iterable
phai coi lai cai init la mot cai array nhu sau
const [ selectedExtras, setSelectedExtras ] = useState<IProductExtra[]>([]);

la array thi moi lai dc chuyen nay
function handleExtraThingClick(ev: React.FormEvent<HTMLFormElement>, extraThing: IProductExtra) {
    const checkbox = ev.target as HTMLInputElement
    const checked = checkbox.checked;
    if (checked) {
        setSelectedExtras(prev => [...prev, extraThing])
    } else {
        setSelectedExtras(prev => (
            prev.filter(e => e.name != extraThing.name )
        ))
    }
}

# position: sticky, bottom-2 = bottom: 0.2rem 
it mean will always sticky on bottom position


# click ngoai cai module se đóng lai
ta sẽ set cái trang thí showPopup: false --> đóng lai, và khi true: sẽ mở popup, 
và dúng cái ev.stopPropagation() để chăn cái event tác động len tren setShowPopup o trên
    { 
    showPopup && ( <div 
      onClick={ () => setShowPopup(false) }
      className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div 
          onClick={ev => ev.stopPropagation() }
      </div>
    ...
  </div> )
  }

# using leading-3 for down side the number of cart


# ghi chu khi build
khi gap mot tinh huong khó, khi build gap lỗi ko biết lỗi gì, 
cố gắng tìm từ khoá trên mang, như useContext typescript, vd mình tìm ra bên duói nên sẽ có thể biet dc nó thiếu type và đinh nghia lai
https://blog.logrocket.com/how-to-use-react-context-typescript/

# KINH NGHIEM BUILD: yarn build 
- trong moi truong hop bug, nên tim tren google voi từ khoá, trang chủ cúa chinh libray đó voi typescript, vì build typescript hay bi loi do cú pháp, thieu khai báo, ko chặt chẽ trong viec dùng biến

- dùng import '@nextui-org/react' se bi lỗi nên se ko dùng nhé
- @nextui-org/dropdown'

- id ko nen để ? vì build se có loi trong truong hop edit, can check edit.id? > 0 la sai
- async function handleDelete(ev: React.MouseEvent<Element>, id: number)  
- async function handleExtraThingChecked(ev: React.FormEvent<HTMLFormElement>, id: number)  
- const { id } = useParams<{id: string}>() 

- Tuyệt chiêu: báo null null, thì lồng cái điều kiện check có trước khi su dung
if (uploadPromise) {
  await toast.promise(uploadPromise, {
      loading: 'Uploading ...',
      success: 'Upload complete',
      error: message,
  }) 
} 
- Tuyệt chieu document is not define, do đang là server side rendering, nhưng control Quill dùng client side nên phải sua lai
const DynamicComponentWithNoSSR = dynamic(  // phai dung kieu nay de client side rendering
    () => import('./home'),
    { ssr: false }
)

export default function AppQuillTextEditor2( {value, setValue} : IQuill ) { 
    return (
        <div>
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} formats={formats} modules={ modules } />  */}
          
            <DynamicComponentWithNoSSR value={ value } setValue={ setValue } /> 
        </div>
    )
}