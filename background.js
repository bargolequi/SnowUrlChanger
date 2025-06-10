function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = RegExp('[?&]' + name + '(=([^&#|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

browser.browserAction.onClicked.addListener((tab) => {
    const currentUrl = tab.url;
    if (currentUrl.startsWith("https://equinix.service-now.com/sn_si_incident.do?")) {
        const sysId = getParameterByName('sys_id', currentUrl);
        if (sysId) {
            const newUrl = `https://equinix.service-now.com/$app_sir_ui_index.do#/app/incident/${sysId}`;
            browser.tabs.update(tab.id, { url: newUrl });
        } else {
            console.error("sys_id parameter not found in the URL.");
        }
    } else {
        console.error("Current URL does not match the pattern.");
    }
});