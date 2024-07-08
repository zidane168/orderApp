import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import { type OptionsType } from 'cookies-next/lib/types'

export const getCookieItem = (key: string, options?: OptionsType) => {
    try {
        const result = getCookie(key, options)
        return result && typeof result !== 'string' ? JSON.parse(result) : result
    } catch {
        console.error(`getCookieItem ${key} error`)
        return `getCookieItem ${key} error`
    }
}

export const setCookieItem = (key: string, value: any, options?: OptionsType) => {
    try {
        return setCookie(key, value, options)
    } catch {}
}

export const removeCookieItem = (key: string, options?: OptionsType) => {
    try {
        return deleteCookie(key, options)
    } catch {}
}

export const saveLocalItem = (key: string, item: any) => {
    try {
        if (typeof window === 'undefined') return
        localStorage.setItem(key, JSON.stringify(item))
    } catch (_) {}
}

export const getLocalItem = <R extends any>(key: string): R => {
    if (typeof window === 'undefined') return null as any
    try {
        return JSON.parse(localStorage.getItem(key) as string)
    } catch {
        try {
            return localStorage.getItem(key) as any
        } catch {
            return null as any
        }
    }
}
