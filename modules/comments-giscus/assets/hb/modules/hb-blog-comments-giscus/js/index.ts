import Giscus from 'giscus/js'
import { default as params } from '@params';
(() => {
    'use strict'

    const endpoint = params.hb.blog.giscus.endpoint ?? params.giscus.endpoint
    const giscus = new Giscus(endpoint)

    const setTheme = (theme) => {
        giscus.setTheme(theme)
    }

    const getPreferredTheme = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('hb:theme', ((e: CustomEvent) => {
            setTheme(e.detail.theme)
        }) as EventListener)

        // Make sure that the theme is match current color, since this script always misses the first theme change event.
        setTimeout(() => {
            const theme = localStorage.getItem('hb-theme')
            setTheme(theme === 'auto' ? getPreferredTheme() : theme)
        }, 3000)
    })
})()
