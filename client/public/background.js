/**
 * background.js is the Security Guard 👮‍♂️. 
 * He stands at the gate (the browser) and decides who gets in. 
 * If he sees someone on the blacklist, he kicks them out and sends them to the "Detention Room."
 * ---------------------------------------
 * BlockPage.jsx is the Detention Room 🏢. 
 * It’s just the place the user lands once they've been blocked.
 * It doesn't need to check URLs; it just needs to look pretty and show your timer.
 */


/**
 * This will run when the user first installed this extension 
 */
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        userSettings: { 
            useWhitelist: false, 
            aiPowered: false 
        },
        questions: [
            "Is this reality what you really want?",
            "What would your future self think?",
            "You have goals. Does this site help you reach them?",
            "Take a deep breath. Why did you really come here?",
            "You are ready to be a failure, aren't you?"
        ],
        blacklist: [],
        whitelist: [],
        realityChecks: 1,
        hesitantTime: 0,
        isActive: true
    }, () => {
        console.log("NoRagrets: Default settings installed.");
    });
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only run our logic when the URL actually changes and is fully available
    if (changeInfo.url) {
        try {
            const url = new URL(changeInfo.url);
            let hostname = url.hostname; // hostname will be something like www.youtube.com only

            // For the case when the user only types youtube.com instead of www.youtube.com
            if (hostname.startsWith("www.")) {
                hostname = hostname.slice(4);
            }

            chrome.storage.local.get(['userSettings', 'isActive', 'blacklist', 'whitelist', 'tempAllow'], (result) => {
                // Turn off 
                if (result.isActive === false) {
                            console.log("Extension is OFF. Carry on.");
                            return; 
                }

                // temporary allow user to browse this website
                if (result.tempAllow === changeInfo.url) {
                    console.log("Temporary access granted");

                    // clear it after use
                    chrome.storage.local.remove('tempAllow');
                    return;
                }

                const settings = result.userSettings || { useWhitelist: false };
                const targetParam = encodeURIComponent(changeInfo.url);
                const blockPageUrl = chrome.runtime.getURL(`index.html?type=block&target=${targetParam}`);

                if (settings.useWhitelist) {
                    const whitelist = result.whitelist || [];
                    if (!whitelist.includes(hostname)) {
                        chrome.tabs.update(tabId, { url: blockPageUrl });
                    }
                } else {
                    chrome.storage.local.get(['blacklist'], (result) => {
                        const blacklist = result.blacklist || [];
                        if (blacklist.includes(hostname)) {
                            chrome.tabs.update(tabId, { url: blockPageUrl });
                        }
                    })
                }
            });
        } catch (e) {
            console.error("Invalid URL");
        }
    }
});

