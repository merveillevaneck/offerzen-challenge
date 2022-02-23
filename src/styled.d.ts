import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        text: string,
        textHeading: string,
        main: string,
        background: string,
        borderRadius: number,
        headerHeight: number,
        pagePadding: number,
        fontFamily: string
    }
}