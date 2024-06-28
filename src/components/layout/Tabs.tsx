import Link from "next/link"; 
import {  usePathname } from 'next/navigation'
import Log from "../../ultis/log";

export default function UserTabs({ isAdmin } : { isAdmin: boolean }) {
    const path: string = usePathname() 
    Log( {'content': path} );
    console.log("env2: ", process.env.GOOGLE_CLIENT_ID)
    return (
        <div className="flex justify-center gap-2 mx-auto mb-4 tabs">
            <Link className={ path === '/profile' ? 'active' : ''} href={'/profile'}> Profile </Link>
            {isAdmin && (
                <>
                    <Link className={ path === '/categories' ? 'active' : ''}   href={'/categories'}> Categories </Link>
                    <Link className={ path === '/menu-items' ? 'active' : ''}   href={'/menu-items'}> Menu Items </Link>
                    <Link className={ path === '/users' ? 'active' : ''}        href={'/users'}> Users </Link>
                </>
            )}
        </div>
    )
}

function userPathname() {
    throw new Error("Function not implemented.");
}
