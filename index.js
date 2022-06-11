const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')
const del = require('del')

const projectsPath = '/Users/yunser/app'

async function main() {
    const fileNames = fs.readdirSync(projectsPath)
    for (let fileName of fileNames) {
        // console.log('fileName', fileName)
        // if (fileName == 'video-merge') {

        // }
        const nodeModulePath = path.join(projectsPath, fileName, 'node_modules')
        if (fs.existsSync(nodeModulePath)) {
            const stat = fs.statSync(nodeModulePath)
            // console.log('stat', stat)
            if (dayjs(stat.mtime).isBefore(dayjs().add(-7, 'days'))) {
                console.log('delete path:', nodeModulePath)
                await del(nodeModulePath, {
                    force: true,
                })
            }
        }
    }
}

main()
