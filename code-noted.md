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

React.FormEvent<HTMLFormElement>
async function handleProfileInfoUpdate(e: React.FormEvent<HTMLFormElement>)


# ------------------------------------------------------
## create / updated / show realtime on Category/page.tsx #------------------------------------------------------
create cong sẽ tự reload lai và khi bấm vào edit se tư sưa 
hoc cach items-start tat ca cả image, label, button se đứng ở dòng trên cùng


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