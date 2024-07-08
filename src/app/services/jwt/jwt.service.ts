import { storageKeyConstants } from '@/utils/constants'

import { storageService } from '../storage'
import { OptionsType } from 'cookies-next/lib/types'

export const getToken = (payload?: { cookieOptions: OptionsType }) => {
    return storageService.getCookieItem(storageKeyConstants.AUTH_TOKEN, payload?.cookieOptions)
}

export const saveToken = (
    token: string,
    payload?: {
        cookieOptions: OptionsType
    }
) => {
    storageService.setCookieItem(storageKeyConstants.AUTH_TOKEN, token, {
        ...payload?.cookieOptions,
        // secure: true,
    })
}

export const destroyToken = (payload?: { cookieOptions: OptionsType }) => {
    storageService.removeCookieItem(storageKeyConstants.AUTH_TOKEN, payload?.cookieOptions)
}
