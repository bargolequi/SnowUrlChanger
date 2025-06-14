const PATH_NAME = "/sn_si_incident.do";
const ORIGIN_NAME = "https://equinix.service-now.com"


chrome.action.onClicked.addListener((tab) => {
    console.log("Got in URL");
    
    chrome.action.setIcon({
        path: {
            "16": "icons/icon16_inv.png",
            "48": "icons/icon48_inv.png",
            "128": "icons/icon128_inv.png"
        }
    });

    if (!tab.url) {
        return;
    }

    let urlObj;
    try {
        urlObj = new URL(tab.url);
    } catch (e) {
        console.error("Invalid URL:", tab.url);
        return;
    }
 
    if (urlObj.origin === ORIGIN_NAME && urlObj.pathname === PATH_NAME) {
        let sysId = urlObj.searchParams.get("sys_id");
        if (sysId) {
            let newUrl = `https://equinix.service-now.com/$app_sir_ui_index.do#/app/incident/${sysId}`;
            try {
                chrome.tabs.update(tab.id, { url: newUrl });
            } catch (e) {
                console.error("Failed to update tab URL:", e);
                notifyPop("Navigation failed", "Could not navigate to the new incident URL.");
            }
        } else {
            notifyPop("No sys_id found", "The current URL does not contain a sys_id parameter.");
        }
    } else {
        notifyPop("Not an incident URL", "This tab's URL is not an sn_si_incident.do page.");
    }

    setTimeout(() => {
        chrome.action.setIcon({
            path: {
                "16": "icons/icon16.png",
                "48": "icons/icon48.png",
                "128": "icons/icon128.png"
            }
        })
    }, 1000);

});
function notifyPop(title, message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: chrome.runtime.getURL("icons/icon48.png"),
        title: title,
        message: message
    });
}