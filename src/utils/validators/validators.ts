export const required = (value: string) => {
    if (value) {
        return undefined
    } else {
        return "Required field"
    }
}