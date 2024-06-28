'use client'
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"

export default function MenuItemsPage() {

    const { loading, data } = useProfile()

    if (loading) {
        return 'Loading user info ...'
    }

    if (!data.admin) {
        return 'Not an admin ...'
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={ true } />
            <form className="max-w-md mx-auto mt-8">
                <div className="flex items-start gap-2"> 
                    <div>
                        Image
                    </div>
                    <div className="grow">
                        <label> Item name </label>
                        <input type="text" />
                        <label> Description </label>
                        <input type="text" />
                        <label> Base price </label>
                        <input type="text" />

                        <button type="submit"> Save </button>
                    </div> 
                </div>
            </form>
        </section>
    )
}