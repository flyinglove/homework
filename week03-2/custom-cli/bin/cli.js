#!/usr/bin/env node

const fs = require('fs')
const  path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([{
    type: 'input',
    name: 'appname',
    message: '请输入项目名称'
}, {
    type: 'input',
    name: 'description',
    message: '请输入项目描述'
}]).then(answer => {
    const tempDir = path.join(__dirname, '../templates')
    const distDir = process.cwd()
    fs.readdir(tempDir, (error, files) => {
        if(error) throw error
        files.forEach(file => {
            const content = ejs.renderFile(path.join(tempDir, file), answer)
            fs.writeFileSync(path.join(distDir, file), content)
        })
    })
})