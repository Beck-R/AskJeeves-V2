import fs, { Dirent } from 'fs'

const getFiles = (dir: string, suffix: string): string[] => {
    const files: Dirent[] = fs.readdirSync(dir, { withFileTypes: true })

    let result: string[] = []

    for (const file of files) {
        if (file.isDirectory()) {
            result = result.concat(getFiles(`${dir}/${file.name}`, suffix))
        } else if (file.name.endsWith(suffix)) {
            result.push(`${dir}/${file.name}`)
        }
    }
    
    return result
}

export default getFiles